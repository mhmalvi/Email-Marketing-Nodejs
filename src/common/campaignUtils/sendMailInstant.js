const Emailqueue = require("../../../models").EmailQueue;
const { transporter } = require("../../../config/utils");
const { fetchCampaigns } = require("./fetchCampaigns");

const sendMail = async (req, res) => {
  var campaigns = await fetchCampaigns();
  console.log(campaigns);
  // const mailOptions = {
  //   from: "<tanjib@quadque.tech>",
  //   to: "megatanjib@gmail.com", // list of receivers
  //   subject: "OTP verification", // Subject line
  //   text: `Your OTP is 4567`,
  //   // text: `Your OTP is`,
  //   // Specify the return path address
  // };

  // const info = await transporter.sendMail(mailOptions, function (err, info) {
  //   if (err) {
  //     console.log(err);
  //     return "Error while sending email" + err;
  //   } else {
  //     console.log("Email sent", info);
  //     return "Email sent";
  //   }
  // });
};
module.exports = { sendMail };
