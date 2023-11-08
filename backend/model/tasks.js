const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date
});

const taskModel = mongoose.model('Tasks', taskSchema);
module.exports = taskModel;