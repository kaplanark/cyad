const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authorization = (req, res, next) => {
    const token = req.cookies['x-access-token'];
    if (!token) {
        return res.redirect("/signin");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        req.userData = decodedToken;
        next();
    } catch {
        return res.redirect("/signin");
    }
};

module.exports = authorization;