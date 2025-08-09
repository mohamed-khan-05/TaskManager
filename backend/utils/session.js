const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("../models"); // Adjust path as needed

const IN_PROD = process.env.NODE_ENV === "production";

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  tableName: "Session", // optional, default is 'Sessions'
  checkExpirationInterval: 15 * 60 * 1000, // clean expired sessions every 15 minutes
  expiration: 24 * 60 * 60 * 1000, // 1 day session expiration
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

module.exports = () => {
  // Sync session table before returning middleware
  sessionStore.sync();
  return session(sessionOptions);
};
