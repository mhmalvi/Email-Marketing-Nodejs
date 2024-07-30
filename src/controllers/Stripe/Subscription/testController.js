const test = async (req, res) => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  // const seconds = Math.floor(date.getTime() / 1000);
  const subscription = await stripe.subscriptions.retrieve(
    "sub_1PiAhYKvZ2nwhLRd77kPChW9"
  );
  res.json(subscription);
};

module.exports = { test };
