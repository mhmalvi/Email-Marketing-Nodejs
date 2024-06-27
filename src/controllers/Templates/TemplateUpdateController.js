const { updateById } = require("../../common/templateUtils/updateById");

const templateUpdate = async (req, res) => {
  const { template, name, id, userID } = req.body;
  const requiredFields = { template, name, id, userID };
  const missingFields = Object.keys(requiredFields).filter(
    (key) =>
      requiredFields[key] === undefined ||
      requiredFields[key] === null ||
      requiredFields[key] === ""
  );
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const result = await updateById(req.body); /// update template ///
    console.log(result);
    if (result === 1) {
      res.status(201).json({
        message: `Template updated`,
        status: 201,
        templateName: name,
        template: template,
      });
    } else {
      res.status(500).json({
        message: `Failed`,
        status: 500,
      });
    }
  }
};

module.exports = { templateUpdate };
