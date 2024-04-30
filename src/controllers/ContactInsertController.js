const express = require("express");

const saveContact = async (req, res) => {
    console.log(req.body);
}

module.exports = {saveContact}