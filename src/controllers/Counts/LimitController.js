const { fieldsValidation } = require("../../../config/utils");
const { campaignCounts } = require("../../common/campaignUtils/fetchCampaigns");

const counts = async (req, res) => {
  const { userID } = req.body;
  // console.log("userID", userID);
  const requiredFields = { userID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const campaignCount = await campaignCounts(userID).counts;
    // console.log("ccampaignCount", campaignCount);
    res.json(campaignCount);
  }
};

module.exports = { counts };
