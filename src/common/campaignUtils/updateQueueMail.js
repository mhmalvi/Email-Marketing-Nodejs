const Emailqueue = require("../../../models").EmailQueue;

const updateDeliveryStatus = async (id) => {
  return await Emailqueue.update(
    { deliver: 1 },
    { where: { id: id, deliver: 0 } }
  );
};

const updateBounceStatus = async (id) => {
  console.log(id);
  return await Emailqueue.update(
    { deliver: 2, bounce: 1 },
    { where: { id: id, deliver: 0 } }
  );
};

module.exports = { updateDeliveryStatus, updateBounceStatus };
