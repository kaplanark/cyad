const express = require("express");
const router = express.Router();
const contactConroller = require("../controller/contact");
const authorization = require('../middleware/auth');

router.get("/contact", contactConroller.renderPage);
router.post("/sendcontactform" ,contactConroller.sendContact);
router.get("/allmails", authorization ,contactConroller.allMails);
router.get("/deletemail/:mailid", authorization ,contactConroller.deleteMail);

module.exports = router;