const router = require("express").Router();
const authController = require("../controllers/authController");
const taskController = require("../controllers/taskController")

// post routes
router.post("/create-task",authController.protect, taskController.createTask)
router.post("/edit-task/taskId",authController.protect, taskController.editTask)

// get routes
router.get("/get-tasks",authController.protect, taskController.getTasksByUserId)


// delete routes
router.delete("/delete-task/taskId", taskController.deleteTaskById)

module.exports = router;