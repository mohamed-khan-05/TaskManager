const express = require("express");
const router = express.Router();
const db = require("../models");
const Tasks = db.Tasks;

router.get("/:type", async (req, res) => {
  const type = req.params.type;
  const email = req.query.email;

  try {
    let filter = { UserEmail: email };

    if (type === "Completed" || type === "Pending" || type === "In Progress") {
      filter.status = type;
    }

    const results = await Tasks.findAll({ where: filter });

    res.status(200).json({ message: results });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Add a new task
router.post("/add", async (req, res) => {
  const taskData = req.body;

  try {
    await Tasks.create(taskData);
    res.status(200).json({ message: { text: "Task Added" } });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Error adding task" });
  }
});

// Delete a task by id
router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedCount = await Tasks.destroy({ where: { id } });
    if (deletedCount > 0) {
      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// Update the status of a task by id
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
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status" });
  }
});

module.exports = router;
