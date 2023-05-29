const router = require("express").Router();
const taskController = require("../controllers/taskController")

router.post("/create-task", taskController.createTask)
router.get("/get-task", taskController.displayTask)


module.exports = router;