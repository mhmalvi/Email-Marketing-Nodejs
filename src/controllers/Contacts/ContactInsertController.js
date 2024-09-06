const express = require("express");
const Contact = require("../../../models").Contact;
const Product = require("../../../models").Product;
const { saveContact } = require("../../common/contactsUtils/saveContact");
const { fetch, contactCounts } = require("../../common/contactsUtils/fetch");
const {
  ifContactExist,
} = require("../../common/contactsUtils/checkIfContactExist");
const { fieldsValidation } = require("../../../config/utils");
const {
  retrieveSubscriptionFromDB,
} = require("../../common/subscription/retrieveSubscriptionDB");
const {
  retrieveSingleSubscription,
} = require("../../common/stripe/subscription/retrieveSingleSubscription");
const { ifGroupExist } = require("../../common/groupsUtils/checkifGroupExist");

const insertContact = async (req, res) => {
  const { data, user_id } = req.body;
  if (data.length > 0) {
    const productDB = await getProductDetailsFromDB(user_id); // Get product details of authenticated user from DB
    let contactCount = await contactCounts(user_id); // Get mail count for today

    if (contactCount >= productDB.contactLimit) {
      return res.status(422).json({
        message: "Contact limit reached",
        status: 422,
      });
    }

    const chunkSize = 500; // Define chunk size based on your needs
    let chunkedContacts = chunkArray(data, chunkSize);

    var batch = "";
    for (const chunk of chunkedContacts) {
      const validContacts = [];
      for (const element of chunk) {
        const userCollectionExist = await ifContactExist(user_id, element); // Check if contact already exists
        const groupExist = await ifGroupExist(user_id, element); ////check if group exists
        if (!userCollectionExist) {
          if (groupExist) {
            batch = userCollectionExist.batchID; ///////// if group exists insert existing batch ID
          } else {
            const batchID =
              "BAT" + Date.now() + Math.floor(Math.random() * 1000000);
            batch = batchID; ////// if group does not exists generate a batch ID
          }
          validContacts.push({
            json: element,
            batchID: batch,
            company: element.company ? element.company : null,
            name: element.name,
            email: element.email || "",
            group: element.group || "",
            user_id: user_id,
          });
        }
      }

      // Update the contact count
      const total_contacts = validContacts.length + contactCount;

      if (total_contacts > productDB.contactLimit) {
        return res.status(422).json({
          message: "Contact limit reached during insertion",
          status: 422,
        });
      }

      // Perform the bulk insert for the current chunk
      if (validContacts.length > 0) {
        await Contact.bulkCreate(validContacts);
        contactCount += validContacts.length;
      }
    }

    res.status(201).json({
      message: "Contacts inserted",
      status: 201,
      contact: JSON.stringify(data),
    });
  } else {
    res.status(403).json({
      message: "No data given",
      status: 403,
    });
  }
};

// Helper function to chunk the array
function chunkArray(array, size) {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }
  return chunked;
}

const insertContactManually = async (req, res) => {
  const { user_id, email, name, group } = req.body;
  const requiredFields = { user_id, email, name, group };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const groupExist = await ifGroupExist(user_id, req.body); ////check if group exists
    const userCollectionExist = await ifContactExist(user_id, req.body); /// check if contact already exists
    if (!userCollectionExist) {
      const productDB = await getProductDetailsFromDB(user_id); /// product details of authenticated user from DB
      //////////////////////////////////////////////////////////////////////
      var contactCount = await contactCounts(user_id); ////get mail count for today
      var result = "";
      if (contactCount <= productDB.contactLimit) {
        if (groupExist) {
          result = await saveContact(
            req.body,
            user_id,
            userCollectionExist.batchID
          ); //// insert contact if group already exists
        } else {
          const batchID =
            "BAT" + Date.now() + Math.floor(Math.random() * 1000000);
          result = await saveContact(req.body, user_id, batchID); //// insert contact if group do not exists
        }
        if (result) {
          res.status(201).json({
            message: "Contact inserted",
            status: 201,
            contact: req.body,
          });
        } else {
          res.status(500).json({
            message: "Failed",
            status: 500,
          });
        }
      } else {
        res.status(422).json({
          message: "Contact limit reached",
          status: 422,
        });
      }
    }
  }
};

/////////////////////// helper method///////////////////////
const getProductDetailsFromDB = async (userID) => {
  const subscriptionDB = await retrieveSubscriptionFromDB(userID); //// fetch user subscription from DB
  //////////////////////////////////////////////
  var subscriptionName = "";
  if (subscriptionDB.subscriptionID !== null) {
    const stripeSubscription = await retrieveSingleSubscription(
      subscriptionDB.subscriptionID
    ); ///fetch user subscription from stripe
    //////////////////////////////////////////////
    subscriptionName = stripeSubscription.items.data[0].price.nickname; /// get subscription name of user from stripe
  } else {
    subscriptionName = "free"; ////// else subscription name is 'free'
  }
  //////////////////////////////////////////////
  return await Product.findOne({
    where: { productName: subscriptionName },
  }); /// get the product details by product name of user from db
};

/////////////////////// helper method///////////////////////

module.exports = { insertContact, insertContactManually };
