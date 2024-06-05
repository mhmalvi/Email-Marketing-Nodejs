

const transporter = async (data) => {
  const customTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: keys.mail.user,
      pass: keys.mail.pass,
    },
  });
};

module.exports = { transporter };
