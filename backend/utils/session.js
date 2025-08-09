const session = require("express-session");

const IN_PROD = process.env.NODE_ENV === "production";

const sessionOptions = {
  key: "userId",
  secret: process.env.SESSION_SECRET || "secretverysecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: IN_PROD,
    httpOnly: true,
    sameSite: IN_PROD ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
  },
};

module.exports = () => session(sessionOptions);
