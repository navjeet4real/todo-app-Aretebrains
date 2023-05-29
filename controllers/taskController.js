const Category = require("../models/task")

const taskController = {
  createTask: async (req, res) => {

    try {
     

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  displayTask: async (req, res) => {
    try {
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });;
    }
  },
}

module.exports = taskController
