const session = require("express-session");

const sessionOptions = {
  key: "userId",
  secret: "secretverysecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Must be true in production (HTTPS)
    httpOnly: true, // Keep for security (no JS access)
    sameSite: "none", // Required for cross-site cookies when using secure:true
    maxAge: 1000 * 60 * 60, // 1 hour
  },
};

module.exports = createSession = () => session(sessionOptions);
