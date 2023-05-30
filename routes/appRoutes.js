const router = require("express").Router();
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController")

// post routes
router.post("/todos",authController.protect, taskController.createTask)

// put routes
router.put("/todos/:id",authController.protect, taskController.editTask)

// get routes
router.get("/todos",authController.protect, taskController.getTasksByUserId)

// delete routes
router.delete("/todos/:id", taskController.deleteTaskById)

module.exports = router;