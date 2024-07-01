const Emailqueue = require("../../../models").EmailQueue;

const updateDeliveryStatus = async (id) => {
  return await Emailqueue.update(
    { deliver: 1, subscription_status: 1 }, /////////1= subscribed, 2 = bounced, 0 = unsubscribed
    { where: { id: id, deliver: 0 } }
  );
};

const updateBounceStatus = async (id) => {
  console.log(id);
  return await Emailqueue.update(
    { deliver: 2, bounce: 1, subscription_status: 2 }, ////////// 1= subscribed, 2 = bounced, 0 = unsubscribed
    { where: { id: id, deliver: 0 } }
  );
};

module.exports = { updateDeliveryStatus, updateBounceStatus };
