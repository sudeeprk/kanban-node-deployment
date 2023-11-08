const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    id: {
        type:Number
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    due: Number,
    });

    const taskModel = mongoose.model("tasks", taskSchema);
    module.exports = taskModel;