const axios = require("axios");
const { generateConfig } = require("../../config/utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("../../config/constants");
const { google } = require("googleapis");
const keys = require("../../config/keys");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  keys.google.clientID,
  keys.google.clientSecret,
  keys.redirectUi
);

oAuth2Client.setCredentials({ refresh_token: keys.google.refresh_token });

async function sendMail(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getUser(req, res) {
  console.log(req.params.email);
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getDrafts(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function readMail(req, res) {
  try {
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getUser,
  sendMail,
  getDrafts,
  readMail,
};
