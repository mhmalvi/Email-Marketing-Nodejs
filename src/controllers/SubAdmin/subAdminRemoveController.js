const {
  randomAlphaNumeric,
  fieldsValidation,
} = require("../../../config/utils");
const { Op } = require("sequelize");
const { findUser } = require("../../common/users/findUser");
const { saveToken } = require("../../common/utils");
const User = require("../../../models").User;
const Token = require("../../../models").Token;
const Subadmin = require("../../../models").Subadmin;

const subAdminRemove = async (req, res) => {
  const { userID, subadminID } = req.body;
  const requiredFields = {
    userID,
    subadminID,
  };
  const missingFields = await fieldsValidation(requiredFields); ///// validation
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const result=await removeSubadmin(userID,subadminID,req,res)
    // res.json(result)
  }
};

const removeSubadmin=async(userID,subadminID,req,res)=>{
    const subadmin = await Subadmin.findOne({where:{id:subadminID}})
    if(subadmin){
        const array = subadmin.userID
        res.json(JSON.parse(array))
    }
}

module.exports = { subAdminRemove };
