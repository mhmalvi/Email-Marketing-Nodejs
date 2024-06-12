const keys = require("./keys");
const nodemailer = require("nodemailer");
const Contacts = require("../models").Contacts;

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
  host: "smtp.gmail.com",
  port: 587,
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
  const { count: totalItems, rows: contacts } = data;
  const currentPage = page;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, contacts, totalPages, currentPage };
};

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group =
  async (data, element) => {
    const email_str = "{email}";
    const name_str = "{name}";
    const group_str = "{group}";
    const subject = data.campaignInfo.subject;
    if (subject.includes(email_str)) {
      var converted_subject = subject.replace(email_str, element.json.email);
    } else if (subject.includes(name_str)) {
      var converted_subject = subject.replace(name_str, element.json.name);
    } else if (subject.includes(group_str)) {
      var converted_subject = subject.replace(group_str, element.json.group);
    } ////// replace subject {email},{name},{group} with recipients' email,name,group //////

    return converted_subject;
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
  convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group,
};
