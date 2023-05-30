const Task = require("../models/task");
const User = require("../models/user");
const mongoose = require("mongoose");

const taskController = {

  // create a task 
  createTask: async (req, res) => {
    try {
      const { user } = req;
      let userId = user._id
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Please provide name.' });
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid id.' });
      }

      const task = new Task({
        name,
        userId,
      });

      await task.save();

      return res.status(200).json({
        status: "Success",
        message: "Task created successfully.",
      });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // get all the tasks of a user
  getTasksByUserId: async (req, res) => {
    try {
      const { user } = req;
      let userId = user._id

      const tasks = await Task.find({ userId });


      if (!tasks) {
        return res.status(404).json({ message: 'Task not found. Add them' });
      }

      const taskPromises = tasks.map(async (item) => {
        const userDocPromise = User.findOne(item.userId).select(
          "firstName lastName"
        );

        const userDoc = await userDocPromise;

        const mergedObject = {
          task_id: item._id,
          name: item.name,
          createdAt: item.createdAt,
          ...userDoc.toObject(),
        };

        // exclude any property with null values
        const mergedObjectWithoutNullValues = Object.fromEntries(
          Object.entries(mergedObject).filter(([_, v]) => v !== null)
        );

        return mergedObjectWithoutNullValues;
      });

      const allTasks = await Promise.all(taskPromises);

      return res.status(200).json({
        status: "Success",
        message: "Task fetched successfully.",
        result: allTasks

      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // edit task by task id
  editTask: async (req, res) => {
    try {
      const { user } = req;
      let userId = user._id

      const { id } = req.params
      const { name } = req.body;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ msg: 'Task not found.' });
      }

      task.name = name;

      await task.save();

      return res.status(200).json({
        status: "Success",
        message: "Task edited successfully.",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });;
    }
  },

  // delete task by task id
  deleteTaskById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID.' });
      }

      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }

      await Task.deleteOne({ _id: id });

      return res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = taskController
