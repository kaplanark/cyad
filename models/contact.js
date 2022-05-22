const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String },
  subject: { type: String, default:null },
  message: { type: String},
});

module.exports = mongoose.model("Mail", mailSchema);