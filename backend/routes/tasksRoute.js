const express = require("express");
const router = express.Router();
const db = require("../models");
const Tasks = db.Tasks;
const { sequelize } = db;

// Display tasks
router.get("/:type", async (req, res) => {
  const type = req.params.type;
  const email = req.query.email;
  try {
    let results = [];
    if (type == "Dashboard") {
      results = await sequelize.query("SELECT * from Tasks WHERE UserEmail=?", {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT,
      });
    } else if (type == "Completed") {
      results = await sequelize.query(
        "SELECT * from Tasks WHERE UserEmail=? AND status=?",
        {
          replacements: [email, type],
          type: sequelize.QueryTypes.SELECT,
        }
      );
    } else if (type == "Pending") {
      results = await sequelize.query(
        "SELECT * from Tasks WHERE UserEmail=? AND status=?",
        {
          replacements: [email, type],
          type: sequelize.QueryTypes.SELECT,
        }
      );
    } else if (type === "In Progress") {
      let temp = "In Progress";
      results = await sequelize.query(
        "SELECT * from Tasks WHERE UserEmail=? AND status=?",
        {
          replacements: [email, temp],
          type: sequelize.QueryTypes.SELECT,
        }
      );
    }

    res.status(200).json({ message: results });
  } catch (error) {
    console.log(error);
  }
});

// Add task
router.post("/add", async (req, res) => {
  const d = req.body;
  console.log(d);
  try {
    await Tasks.create(d);
    res.status(200).json({ message: { text: "Task Added" } });
  } catch (error) {
    console.log(error);
  }
});

// delete task
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const result = await sequelize.query("DELETE from Tasks WHERE id=?", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE,
    });
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

// update status
router.put("/updateStatus", async (req, res) => {
  const { id, status } = req.body;
  try {
    const task = await Tasks.findByPk(id);
    if (task) {
      task.status = status;
      await task.save();
      res.status(200).json({ message: "Task status updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task status" });
  }
});

module.exports = router;
