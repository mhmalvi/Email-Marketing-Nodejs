const { TrackingOptionsDoesNotExistException } = require("@aws-sdk/client-ses");
const { fieldsValidation } = require("../../../config/utils");

const Token = require("../../../models").Token;

const subadminLogout = async (req, res) => {
  const { said } = req.body;
  const requiredFields = {
    said,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const bearerHeader = req.headers["authorization"];
    const result = await Token.destroy({ where: { satok: bearerHeader, said: JSON.parse(said) } });
    res.json(result)
  }
};

module.exports = { subadminLogout };
