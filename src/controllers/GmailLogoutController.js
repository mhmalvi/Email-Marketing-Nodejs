const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { createConnection } = require("mysql");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const connection = require("../../db/db");
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const { isExists } = require("date-fns");
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
// const { loadSavedCredentialsIfExist } = require("../ ");
const revokeTokenUrl = "https://oauth2.googleapis.com/revoke";
const OAuth2 = google.auth.OAuth2;

const logout = async () => {
  // Read the JSON file
  const data = fs.readFileSync(TOKEN_PATH);
  // Parse JSON data
  const credentials = JSON.parse(data);
  const oauth2Client = new OAuth2(
    credentials.client_id,
    credentials.client_secret
  );
  // return credentials;
  const refreshToken = credentials.refresh_token;
  // console.log(credentials.refresh_token);
  await oauth2Client.revokeToken(refreshToken);
  return json("Token revoked successfully");
};

module.exports = { logout };
