const Emailqueue = require("../../../models").EmailQueue;

const updateDeliveryStatus = async (email) => {
  return await Emailqueue.update(
    { deliver: 1 },
    { where: { recipientEmail: email, deliver: 0 } }
  );
};

const updateBounceStatus = async (email) => {
  return await Emailqueue.update(
    { deliver: 2, bounce: 1 },
    { where: { recipientEmail: email, deliver: 0 } }
  );
};

module.exports = { updateDeliveryStatus, updateBounceStatus };
