const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createSession = require("./utils/session");
const db = require("./models");
require("dotenv").config();

const app = express();

// Use session middleware (ensure createSession sets up express-session correctly)
app.use(createSession());

// Dynamic CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // fallback origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

// Built-in body parsing middleware replaces body-parser usage
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
        `CORS Origin: ${process.env.CORS_ORIGIN || "http://localhost:5173"}`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
