const { destroy } = require("../../common/templateUtils/delete");

const templateDestroy = async (req, res) => {
  console.log(req.body);
  if (req.body.id && req.body.client_id) {
    const result = await destroy(req.body);
    console.log(result);
    if (result === 1) {
      res.status(201).json({
        message: "Template deleted",
        status: 201,
      });
    } else {
      res.status(500).json({
        message: "Failed",
        status: 500,
      });
    }
  } else {
    res.status(422).json({
      message: "Please provide all fields",
      status: 422,
    });
  }
};

module.exports = { templateDestroy };
