const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  dueDate: Date,
});

const boardSchema = new mongoose.Schema({
  name: String,
  description: String,
  tasks: [taskSchema],
});

const boardModel = mongoose.model("kanban", boardSchema);
module.exports = boardModel;
