const { TrackingOptionsDoesNotExistException } = require("@aws-sdk/client-ses");

const Subadmin = require("../../../models").Subadmin;

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
    const result = await Token.destroy({ where: { satok: bearerHeader, said: said } });
    res.json(result)
  }
};

module.exports = { subadminLogout };
