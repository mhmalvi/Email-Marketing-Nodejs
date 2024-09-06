const { fieldsValidation } = require("../../../config/utils");
const {
  campaignDestroyer,
} = require("../../common/campaignUtils/destroyCampaign");

const CampaignQueue = require("../../../models").CampaignQueue;
const campaignDestroy = async (req, res) => {
  const { userID, campaignIDs } = req.body;
  const requiredFields = { userID, campaignID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    campaignIDs.map(async (campaignID) => {
      await campaignDestroyer(userID, campaignID);
    });

    if (result > 0) {
      res.status(201).json({
        message: "Deleted",
        status: 201,
      });
    } else {
      res.status(500).json({
        message: "Failed",
        status: 500,
      });
    }
  }
};
module.exports = { campaignDestroy };
