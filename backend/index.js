const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createSession = require("./utils/session");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();
app.use(createSession());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
const usersRouter = require("./routes/usersRoute");
app.use("/users", usersRouter);
const tasksRouter = require("./routes/tasksRoute");
app.use("/tasks", tasksRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on PORT 3001");
  });
});
