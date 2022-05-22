const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema({
  title: { type: String, default: null },
  bannertext: { type: String, default:null},
  logo: { type: String, default:null },
  herotext: { type: String, default:null},
});

module.exports = mongoose.model("Homepage", homepageSchema);