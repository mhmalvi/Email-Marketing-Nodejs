const { fieldsValidation } = require("../../../config/utils");

const User = require("../../../models").User;

const userFetch = async (req, res) => {
    const { userID, id } = req.body;
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
        const users = await User.findAll({});
        res.json(users);
    }
};

module.exports = { userFetch };
