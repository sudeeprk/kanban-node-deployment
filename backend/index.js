const express = require("express");
require("dotenv").config();
const { createServer } = require("node:http");
const taskModel = require("./model/tasks");
const mongoose = require("mongoose");
const cors = require("cors");

const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
app.use(express.json());
const io = new Server(server);
const PORT = 5000;

mongoose
  .connect("mongodb+srv://sudeep:sudeep@cluster0.cqfoz4h.mongodb.net/kanban")
  .then(() => console.log("Mongodb connected"))
  .catch(() => console.log("error"));

app.use(cors());

// Define a variable to keep track of the auto-incremented ID
let autoIncrementId = 1;

app.get("/api/tasks", (req, res) => {
  taskModel
    .find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

app.post("/api/addtask", (req, res) => {
  const { name, description } = req.body;

  // Create a new task with an auto-incremented ID
  const newData = new taskModel({ id: autoIncrementId, name, description });

  // Increment the auto-increment ID for the next task
  autoIncrementId++;

  newData
    .save()
    .then(() => res.json(newData))
    .catch((err) => res.json(err));
});

app.put("/api/editboard", async (req, res) => {
  try {
    const { id, name, description } = req.body;

    const update = {
      $set: {
        name: name,
        description: description,
      },
    };

    // Find and update the data in your database based on the provided ID
    const updatedData = await taskModel.findOneAndUpdate(
      { id: id }, // Specify the task to update based on the ID
      update
    );

    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating data" });
  }
});

app.get("/api/findtask/:id", (req, res) => {
  const taskId = req.params.id;

  taskModel
    .findOne({ id: taskId })
    .then((task) => {
      if (task) {
        // Task with the specified ID found
        res.json(task);
      } else {
        // Task not found
        res.status(404).json({ error: "Task not found" });
      }
    })
    .catch((err) => {
      // Handle database query errors
      console.error("Error finding task:", err);
      res.status(500).json({ error: "Error finding task" });
    });
});

app.delete("/api/deleteboard/:id", (req, res) => {
  const customId = req.params.id;

  taskModel.deleteOne({ id: customId })
    .then(() => {
      console.log("Data deleted successfully");
      res.json({ message: "Data deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting data:", err);
      res.status(500).json({ error: "Error deleting data" });
    });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
