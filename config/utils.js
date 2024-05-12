const keys = require("./keys");
const nodemailer = require("nodemailer");

const generateConfig = (url, accessToken) => {
  return {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${accessToken} `,
      "Content-type": "application/json",
    },
  };
};

const randomAlphaNumeric = (length) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

function generateOTP() {
  const randomNum = Math.random() * 9000;
  return Math.floor(1000 + randomNum);
}

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: keys.mail.user,
//     pass: keys.mail.pass,
//   },
// });
const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.gmail.com",
  secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: keys.mail.user,
      pass: keys.mail.pass,
    },
});
// let transporter = nodemailer.createTransport({
//   sendmail: true,
//   newline: "unix",
//   path: "/usr/sbin/sendmail",
// });

const getIp = () => {
  var ip = "";
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Contacts } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// randomAlphaNumeric(5); // '0afad'

module.exports = {
  generateConfig,
  randomAlphaNumeric,
  getIp,
  transporter,
  generateOTP,
  getPagination,
  getPagingData,
};