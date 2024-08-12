const Stripe = require("stripe");
const stripe = require("../../../../config/keys");
const Subscribe = require("../../../../models").Subscribe;
const stripe_key = Stripe(process.env.STRIPE_KEY);
const {
  transporter,
} = require("../../../common/transporterUtils/customTransporter");
const nodemailer = require("nodemailer");

const test = async (req, res) => {
  const customTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tanjb@quadque.tech",
      pass: "kseg koof khob nuzj",
    },
  });
  const mailOptions = {
    from: `tanjib@quadque.tech`,
    to: "tanjib@quadque.tech", // list of receivers
    subject: "mail.subject", // Subject line
    html: "htmlToSend",
  };
  var errorCode = 0;
  try {
    await customTransporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error", error);
    res.json(error.responseCode);
  }
};

module.exports = { test };
