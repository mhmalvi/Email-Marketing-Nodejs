const Token = require("../../models").Token;

const userAccess = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  const token = await Token.findOne({where:{token:bearerHeader}})
  res.json(token.satok)
  if(token){

  }
};
module.exports = { userAccess };
