const { fieldsValidation } = require("../../../config/utils");

const Contactus = require("../../../models").Contactus;
const fetchContactUs = async (req, res) => {
  const { userID } = req.body;
  // console.log("userID", userID);
  const requiredFields = {
    userID,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    try {
      const result = await Contactus.findAll({});
      if (result) {
        res.status(201).json({
          message: "success",
          status: 200,
          data: result,
        });
      } else {
        res.status(404).json({
          message: "No data found",
          status: 404,
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
module.exports = { fetchContactUs };
