const CampaignQueue = require("../../../models").CampaignQueue;
const EmailQueue = require("../../../models").EmailQueue;
const { fetchCampaigns } = require("../../common/campaignUtils/fetchCampaigns");

const allRecipients = async (req, res) => {
  console.log();
  const { userID, campaignID } = req.body;
  const requiredFields = { userID, campaignID };
  const missingFields = await fieldsValidation(requiredFields);
  if (missingFields.length > 0) {
    res.status(422).json({
      message: `Missing fields are ${missingFields.join(", ")}`,
      status: 422,
    });
  } else {
    const recipients = await EmailQueue.fetchAll({
      where: { userID: userID, campaignID: campaignID },
    });
    if (recipients.length > 0) {
      res.status(200).json({
        message: "success",
        status: 200,
        recipients: recipients,
      });
    }
  }
};

module.exports = { allRecipients };
