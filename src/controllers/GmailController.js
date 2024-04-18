const express = require("express");
const axios = require("axios");
const fs = require("fs").promises;
const { createConnection } = require("mysql");
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const connection = require("../../db/db");
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const { isExists } = require("date-fns");
const TOKEN_PATH = path.join(process.cwd(), "../../token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

const mailList = async (req, res) => {
  const result = await gmail.users.messages.list({
    userId: "megatanjib@gmail.com",
    maxResults: 10,
  });

  const messages = result.data.messages;
};

async function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.labels.list({
    userId: "megatanjib@gmail.com",
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;
  }
  console.log("Labels:");
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}



async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}
async function authorize() {
  console.log("auth");
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}
async function auth() {
  authorize().catch(console.error);
}

module.exports = {
  mailList,
  auth,
};
