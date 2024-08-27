const { fieldsValidation } = require("../../../config/utils");

const Contactus = require("../../../models").Contactus;
const deleteContactus = async (req, res) => {
  const { userID, id } = req.body;
  const requiredFields = {
    userID,
    id,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const result = await Contactus.destroy({ where: { id: JSON.parse(id) } });
    if (result === 1) {
      res.status(201).json({
        message: "Deleted",
        status: 201,
      });
    } else {
      res.status(500).json({
        message: "Failed",
        status: 500,
      });
    }
  }
};

// -----------------------x---------------------

module.exports = { deleteContactus };
