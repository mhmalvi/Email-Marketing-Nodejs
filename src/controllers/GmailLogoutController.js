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
const revokeTokenUrl = process.env.GOOGLE_REVOKE_URL;
const OAuth2 = google.auth.OAuth2;

const logout = async (req, res) => {
  res.redirect(process.env.GOOGLE_LOGOUT_URL);
};

module.exports = { logout };
