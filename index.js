const express = require("express");
const dotenv = require("dotenv");
const parser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("./config/database").connect();
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cookieParser());

const page = require("./routes/page");
const admin = require("./routes/admin");
const product = require("./routes/product");
const payment = require("./routes/payment");
const contact = require("./routes/contact");

app.use(
    session({
        cookie: { maxAge: 60000 * 120 },
        secret: "R734RH3URHHhffhre834HR4",
        resave: false,
        saveUninitialized: false,
    })
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use('/assets/css', express.static(__dirname + '/assets/css'));
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/assets/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/assets/js', express.static(__dirname + '/assets/js'));

app.use('/assets/css', express.static(__dirname + '/node_modules/swiper'));
app.use('/assets/js', express.static(__dirname + '/node_modules/swiper'));

//alerts
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.errors = req.flash("error");
    res.locals.message = req.flash("message");
    res.locals.info = req.flash("info");
    next();
});


app.use(page,);
app.use(admin);
app.use(product);
app.use(payment);
app.use(contact);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App started port: ${PORT}`);
    }
});