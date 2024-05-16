const Contact = require("../../../models").Contact;

const findOne = async(id) => {
    return await Contact.findByPk(id)
}

module.exports = { findOne };