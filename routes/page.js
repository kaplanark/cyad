const express = require('express');
const Homepage = require("../models/homepage");
const Product = require('../models/product');
const Links = require('../models/links');
const router = express.Router();

router.get('/', (req, res, next) => {
    Homepage.findOne({}, (err, homeData) => {
        if (err) {
            console.log(err);
        } else {
            Product.find({}, (err, found) => {
                if (err) {
                    console.log(err);
                } else {
                    Links.findOne({}, (err, linksData) => {
                        res.render('pages/index', { homeData: homeData, found: found,linksData:linksData });
                        next();
                    })
                }
            });
        }
    });
});
router.get("/homepage", (req, res) => {
    res.redirect("/");
})

module.exports = router;