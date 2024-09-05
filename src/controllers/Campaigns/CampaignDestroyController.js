const { fieldsValidation } = require("../../../config/utils");
const {
  campaignDestroyer,
} = require("../../common/campaignUtils/destroyCampaign");

const CampaignQueue = require("../../../models").CampaignQueue;
const campaignDestroy = async (req, res) => {
  const { userID, campaignName } = req.body;
  const requiredFields = { userID, campaignName };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const result = await campaignDestroyer(req.body);
    res.json(result);
  }
};
module.exports = { campaignDestroy };
