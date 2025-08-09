const session = require("express-session");

const IN_PROD = process.env.NODE_ENV === "production";

const sessionOptions = {
  key: "userId",
  secret: process.env.SESSION_SECRET || "secretverysecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: IN_PROD, // true only in production (requires HTTPS)
    httpOnly: true, // recommended for security
    sameSite: IN_PROD ? "none" : "lax", // none for cross-site in prod, lax for dev
    maxAge: 1000 * 60 * 60, // 1 hour
  },
};

module.exports = () => session(sessionOptions);
