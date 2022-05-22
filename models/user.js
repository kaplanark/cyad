const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  password: { type: String },
  email: { type: String, unique: true },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);