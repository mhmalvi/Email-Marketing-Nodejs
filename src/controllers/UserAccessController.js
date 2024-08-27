const Token = require("../../models").Token;

const userAccess = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  const token = await Token.findOne({ where: { token: bearerHeader } });
  if (token.satok === null) {
    if (token.role === 1) {
      res.status(200).json({
        message: "superadmin",
      });
    }
    res.status(200).json({
      message: "customer",
    });
  } else {
    res.status(200).json({
      message: "subadmin",
    });
  }
};
module.exports = { userAccess };
