const Token = require("../../models").Token;

const userAccess = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
};
module.exports = { userAccess };
