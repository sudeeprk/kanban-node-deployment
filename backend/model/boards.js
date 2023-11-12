const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
  name: String,
  description: String,
  columns: [
    {
      name: String,
      tasks: [
        {
          taskName: String,
          taskDescription: String,
          dueDate: Date,
        },
      ],
    },
  ],
});

const boardModel = mongoose.model('kanban', boardSchema);


module.exports = boardModel;