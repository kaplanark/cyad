const mongoose = require("mongoose");

const linksSchema = new mongoose.Schema({
  facebook: { type: String},
  twitter: { type: String},
  instagram: { type: String}
});

module.exports = mongoose.model("Links", linksSchema);