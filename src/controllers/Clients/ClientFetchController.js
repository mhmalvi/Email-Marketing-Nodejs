const { fieldsValidation } = require("../../../config/utils");

const User = require("../../../models").User;

const userFetch = async (req, res) => {
  const { userID, page, size } = req.body;
  const requiredFields = {
    userID,
    page,
    size,
  };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    offset = (page - 1) * size;
    try {
      const total = await User.findAll({
        order: [["id", "DESC"]],
      });
      const totalPages = total.length / size;
      const result = await fetch(size, offset);
      if (result) {
        res.status(200).json({
          message: "success",
          status: 200,
          users: result,
          total: total.length,
          totalPages: Math.ceil(totalPages),
          current_page: page,
        });
      } else {
        res.status(404).json({
          message: "No data found",
          status: 404,
        });
      }
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }
};

// ------------------------ helper --------------------

const fetch = async (size, offset) => {
  return await User.findAll({
    order: [["id", "DESC"]],
    limit: size,
    offset: offset,
  });
};

module.exports = { userFetch };
