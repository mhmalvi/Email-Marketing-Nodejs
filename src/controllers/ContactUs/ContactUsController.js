const { fieldsValidation } = require("../../../config/utils");

const Contactus = require("../../../models").Contactus;
const insertContactUs = async (req, res) => {
  const { email, subject, description } = req.body;
  // console.log("userID", userID);
  const requiredFields = {
    email,
    subject,
    description,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    try {
      const result = await Contactus.create({
        email: email,
        subject: subject,
        description: description,
        status: 0,
      });
      if (result) {
        res.status(201).json({
          message: "We will contact you shortly",
          status: 201,
          data: result,
        });
      }
    } catch (error) {
      res.json({
        message: "Failed",
        data: error,
      });
    }
  }
};
module.exports = { insertContactUs };