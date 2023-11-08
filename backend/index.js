const express = require("express");
require("dotenv").config();
const { createServer } = require("node:http");
const boardModel = require("./model/boards");
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

let autoIncrementId = 1;

//To retrive all saved Boards from MongoDB

app.get("/api/boards", (req, res) => {
  boardModel
    .find()
    .then((boards) => res.json(boards))
    .catch((err) => res.json(err));
});

//To add New Board

app.post("/api/addboard", (req, res) => {
  const { name, description } = req.body;
  const newData = new boardModel({ id: autoIncrementId, name, description });
  autoIncrementId++;

  newData
    .save()
    .then(() => res.json(newData))
    .catch((err) => res.json(err));
});

//To edit Boards name and description

app.put("/api/editboard", async (req, res) => {
  try {
    const { id, name, description } = req.body;

    const update = {
      $set: {
        name: name,
        description: description,
      },
    };

    const updatedData = await boardModel.findOneAndUpdate({ id: id }, update);

    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating data" });
  }
});

//To find Board by ID(self generated auto incrementing ID)

app.get("/api/findboard/:id", (req, res) => {
  const boardId = req.params.id;

  boardModel
    .findOne({ id: boardId })
    .then((board) => {
      if (board) {
        res.json(board);
      } else {
        res.status(404).json({ error: "board not found" });
      }
    })
    .catch((err) => {
      console.error("Error finding board:", err);
      res.status(500).json({ error: "Error finding board" });
    });
});

//To delete Board by ID

app.delete("/api/deleteboard/:id", (req, res) => {
  const customId = req.params.id;

  boardModel.deleteOne({ id: customId })
    .then(() => {
      console.log("Data deleted successfully");
      res.json({ message: "Data deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting data:", err);
      res.status(500).json({ error: "Error deleting data" });
    });
});

//From here Routes for Task i.e columns Tab for each Boards
//To add New Task

app.post("/api/addtask", (req, res) => {
  const { name, description, dueDate } = req.body;

//Used new model i.e taskModel
  const newTask = new taskModel({
    name,
    description,
    dueDate
  });

  newTask
    .save()
    .then(() => {
      res.json({ message: "Task added to new collection successfully" });
    })
    .catch((err) => {
      console.error("Error adding task to new collection:", err);
      res.status(500).json({ error: "Error adding task to new collection" });
    });
});

//To retrieve all saved tasks from MongoDB

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

//For Socket.io {Not yet Used}

io.on("connection", (socket) => {
  console.log("a user connected");
});

//Boom 
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
