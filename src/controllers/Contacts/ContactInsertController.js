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

const insertContact = async (req, res) => {
  const { data, user_id } = req.body;
  console.log(data)
  if (data.length > 0) {
    const productDB = await getProductDetailsFromDB(user_id); /// product details of authenticated user from DB
    //////////////////////////////////////////////////////////////////////
    var contactCount = await contactCounts(user_id); ////get mail count for today
    //////////////////////////////////////////////////////////////////////
    const total_contacts = data.length + contactCount;
    if (total_contacts <= productDB.contactLimit) {
      await json.forEach(async (element) => {
        var count = 0;
        const userCollectionExist = await ifContactExist(user_id, element); //// check if contacts already exist
        //////////////////////////////////////////////////////////////////////
        if (!userCollectionExist) {
          await saveContact(element, user_id); ///////// save contact
        }
      });
      res.status(201).json({
        message: "Contact inserted",
        status: 201,
        contact: JSON.stringify(json),
      });
    } else {
      res.status(422).json({
        message: "Contact limit reached",
        status: 422,
      });
    }
  } else {
    res.status(403).json({
      message: "No data given",
      status: 403,
    });
  }
};

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
    const userCollectionExist = await ifContactExist(user_id, req.body); /// check if contact already exists
    if (!userCollectionExist) {
      const productDB = await getProductDetailsFromDB(user_id); /// product details of authenticated user from DB
      //////////////////////////////////////////////////////////////////////
      var contactCount = await contactCounts(user_id); ////get mail count for today
      if (contactCount <= productDB.contactLimit) {
        await saveContact(req.body, user_id); //// insert contact
        res.status(201).json({
          message: "Contact inserted",
          status: 201,
          contact: req.body,
        });
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
    subscriptionName = stripeSubscription.items.data[0].price.lookup_key; /// get subscription name of user from stripe
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
