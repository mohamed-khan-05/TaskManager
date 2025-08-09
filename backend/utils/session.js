const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("../models");

const IN_PROD = process.env.NODE_ENV === "production";

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  tableName: "Session",
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});

const sessionOptions = {
  key: "userId",
  secret: process.env.SESSION_SECRET || "secretverysecret",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: IN_PROD,
    httpOnly: true,
    sameSite: IN_PROD ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
  },
};

sessionStore.sync();

module.exports = () => session(sessionOptions);
