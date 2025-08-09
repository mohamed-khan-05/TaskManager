const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createSession = require("./utils/session");
const db = require("./models");
require("dotenv").config();

const app = express();

// Use session middleware
app.use(createSession());

// CORS config with credentials & correct origin
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN || "https://mohamed-taskmanager.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());

// JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const usersRouter = require("./routes/usersRoute");
const tasksRouter = require("./routes/tasksRoute");

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// Sync DB and start server
db.sequelize
  .sync()
  .then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
      console.log(
        `CORS Origin: ${
          process.env.CORS_ORIGIN || "https://mohamed-taskmanager.netlify.app"
        }`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
