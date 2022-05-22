const User = require("../models/user");
const Payment = require("../models/payment");
const Homepage = require("../models/homepage");
const Links = require("../models/links");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//rendering
const renderPage = async (req, res) => {
  Payment.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/dashboard', { found: found });
    }
  });
};

//sign in
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      req.flash("message", "Tüm Girişleri Doldurun");
      res.status(400).redirect('/signin');
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
      res.cookie("x-access-token", token, {
      }).status(200).redirect('/admin');
    }
    req.flash("error", "Giriş Başarısız. Kullanıcı adı ve parolayı kontrol ediniz.");
    res.status(400).redirect('/signin');
  } catch (err) {
    console.log(err);
  }
};

//sign up
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      req.flash("message", "Bu kullanıcı daha önce oluşturulmuş.")
      return res.status(409).redirect("/singin");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.status(201).render('admin/signin');
  } catch (err) {
    console.log(err);
  }
};

const logOuth = async (req, res) => {
  try {
    res.clearCookie('x-access-token').redirect('/');
  } catch (err) {
    console.log(err);
  }
}

const userSettings = async (req, res) => {
  User.find({}, (err, userdata) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/settings', { userdata: userdata });
    }
  });
}

const updateUser = async (req, res) => {
  try {
    const { username, email, password, id } = req.body;
    encryptedPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findByIdAndUpdate({ _id: id }, {
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    req.flash("success", "Kullanıcı güncellendi");
    res.status(201).redirect('/usersettings');
  } catch (err) {
    req.flash("errorr", "Güncelleme başarısız");
    res.redirect('/usersettings');
    console.log(err);
  }
}

const newUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      req.flash("message", "Bu kullanıcı daha önce oluşturulmuş.")
      return res.status(409).redirect("/settings");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    req.flash("success", "Kullanıcı oluşturuldu.")
    res.status(201).redirect("/settings");
  } catch (err) {
    req.flash("errorr", "Kullanıcı oluşturma başarısız");
    res.redirect('/settings');
    console.log(err);
  }
};

const homePageSR = async (req, res) => {
  Homepage.findOne({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/homepageset', { found: found });
    }
  });
}

const homePageSettings = async (req, res) => {
  try {
    const { id, title, bannertext, herotext } = req.body;
    const updateSet = await Homepage.findByIdAndUpdate({ _id: id }, {
      title,
      bannertext,
      herotext,
    });
    req.flash("success", "Ayarlar güncellendi");
    res.status(201).redirect('/hpsettings');
  } catch (err) {
    req.flash("errorr", "Güncelleme başarısız");
    res.redirect('/hpsettings');
    console.log(err);
  }
}

const socialLinks = async (req, res) => {
  Links.findOne({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/sociallinks', { linksData: data });
    }
  });
};

const socialLinksUpdate = async (req, res) => {
  try {
    const { facebook, twitter, instagram } = req.body;
    const cc = await Links.findOne({});
    if (cc) {
      Links.updateOne({ facebook, twitter, instagram }, (err) => {
        if (err) {
          console.log(err);
          req.flash("error", "Güncelleme başarısız");
          res.redirect("/sociallinks");
        }
        req.flash("success", "Güncelleme başarılı");
        res.redirect("/sociallinks");
      });
    } else {
      const createLinks = await Links.create(
        { facebook, twitter, instagram }
      );
      res.redirect("/sociallinks");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  renderPage,
  signIn,
  signUp,
  logOuth,
  userSettings,
  updateUser,
  newUser,
  homePageSR,
  homePageSettings,
  socialLinks,
  socialLinksUpdate
};

