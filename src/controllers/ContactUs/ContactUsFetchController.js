const { fieldsValidation } = require("../../../config/utils");

const Contactus = require("../../../models").Contactus;
const fetchContactUs = async (req, res) => {
  const { userID } = JSON.parse(req.body.userID);
  const page = JSON.parse(req.body.page);
  const size = JSON.parse(req.body.per_page);
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
      const total = await Contactus.findAll({
        order: [["id", "DESC"]],
      });
        const totalPages = total.length / size;
        const result = await fetch(data, size, offset);
      if (result) {
        res.status(201).json({
          message: "success",
          status: 200,
          data: result,
        });
      } else {
        res.status(404).json({
          message: "No data found",
          status: 404,
        });
      }
    } catch (error) {
      res.json({
        message: "Failed",
        data: error,
      });
    }
  }
};


// -----------------------x---------------------

const fetch = async () => {
    await Contactus.findAll({
      order: [["id", "DESC"]],
    });
}
module.exports = { fetchContactUs };
