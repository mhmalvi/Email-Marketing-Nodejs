const { fieldsValidation } = require("../../../config/utils");

const Contactus = require("../../../models").Contactus;
const deleteContactus = async (req, res) => {
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
    const result = await Contactus.destroy({ where: { id: id } });
    res.json(result);
  }
};

// -----------------------x---------------------

module.exports = { deleteContactus };
