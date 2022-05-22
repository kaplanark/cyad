const express = require("express");
const adminConroller = require("../controller/admin");
const router = express.Router();
const authorization = require('../middleware/auth');

const dotenv = require("dotenv");
dotenv.config();

router.get("/admin", authorization, adminConroller.renderPage);
router.get("/signin", (req, res) => {
  res.render("admin/signin");
});
router.post("/signin", adminConroller.signIn);
router.get("/signup", authorization, (req, res) => {
  res.render("admin/signup");
});
router.post("/signup",authorization, adminConroller.signUp);
router.get("/logouth", adminConroller.logOuth);
router.get("/usersettings", authorization, adminConroller.userSettings);
router.post("/updateuser", authorization, adminConroller.updateUser);
router.post("/newuser", authorization, adminConroller.newUser);
router.get("/hpsettings", authorization, adminConroller.homePageSR);
router.post("/hpsettings", authorization, adminConroller.homePageSettings);

module.exports = router;