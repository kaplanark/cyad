// const nodemailer = require("nodemailer");
const Mail = require("../models/contact");
const Links = require("../models/links");
const Homepage = require("../models/homepage");
const telegramBot = require("../helper/telegrambot");

const renderPage = async (req, res) => {
    Homepage.findOne({}, (err, homeData) => {
        if (err) {
            console.log(err);
        } else {
            Links.findOne({}, (err, linksData) => {
                if(err){
                    console.log(err);
                }
                res.render('pages/contact', { homeData: homeData,linksData:linksData });
            })
        }
    });
}
const sendContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!(name && email && subject && message)) {
            req.flash("info", "Tüm Girişleri Doldurun");
            res.status(400).redirect('/contact');
        }
        const mail = await Mail.create({
            name,
            email,
            subject,
            message
        });
        req.flash("success", "İletişim formu gönderme başarılı.");
        res.status(201).redirect("/contact");
        telegramBot.sendNewContact(name);
    } catch (err) {
        console.log(err);
    }
}
const allMails = async (req, res) => {
    Mail.find({}, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/mails/all", { found: found });
        }
    });
};
const deleteMail = async (req, res) => {
    Mail.deleteOne({ _id: req.params.mailid }, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            req.flash("success", "Mail Silme Başarılı");
            res.redirect("/allmails");
        }
    });
}
module.exports = {
    renderPage,
    sendContact,
    allMails,
    deleteMail
};