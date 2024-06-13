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

function replaceMultipleStrings(str, replacements) {
  let hasReplacements = false;

  // Check for matches and apply replacements
  const replacedStr = replacements.reduce((acc, replacement) => {
    const regex = new RegExp(escapeRegExp(replacement.search), "g");
    if (regex.test(acc)) {
      hasReplacements = true;
      return acc.replace(regex, replacement.replace);
    }
    return acc;
  }, str);

  return hasReplacements ? replacedStr : str;
}

const convert_curly_brace_email_name_and_group_to_recipient_email_and_name_and_group =
  async (data, element) => {
    const subject = data.campaignInfo.subject;
    const replacementsMatch = [
      { search: "{email}", replace: element.json.email },
      { search: "{name}", replace: element.json.name },
      { search: "{group}", replace: element.json.group },
    ];
    const newStrMatch = replaceMultipleStrings(subject, replacementsMatch);
    return newStrMatch
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
