const express = require("express");
require("dotenv").config();
const { createServer } = require("node:http");
const boardModel = require("./model/boards");
const mongoose = require("mongoose");
const cors = require("cors");

const { Server } = require("socket.io");
const { env } = require("node:process");
const app = express();
const server = createServer(app);
app.use(express.json());
const io = new Server(server);
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
          })
    .catch(error => console.error('Error connecting to MongoDB:', error));
app.use(cors());

// To get list of all Boards(collections)

app.get('/api/boards', async (req, res) => {
  try {
    const boards = await boardModel.find();
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// To create new board

app.post('/api/boards', async (req, res) => {
  const newBoard = req.body;
  try {
    const createdBoard = await boardModel.create(newBoard);
    res.json(createdBoard);
  } catch (error) {
    console.error('Error adding board:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// To find Board By ID (_id)

app.get('/api/boards/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const board = await boardModel.findById(id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// To find Board by ID and update (_id)

app.put("/api/boards/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedBoard = await boardModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(updatedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// To find Board by ID and delete (_id)

app.delete("/api/boards/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBoard = await boardModel.findByIdAndDelete(id);

    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// To add Task for specific Board using its id

app.post('/api/boards/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const { columnName, taskName, taskDescription, dueDate } = req.body;

  try {
    const board = await boardModel.findById(id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    let existingColumn = null;

    for (const column of board.columns) {
      if (column.name === columnName) {
        existingColumn = column;
        break;
      }
    }

    if (existingColumn) {
      const newTask = {
        taskName,
        taskDescription,
        dueDate,
      };

      existingColumn.tasks.push(newTask);
    } else {
      const newColumn = {
        name: columnName,
        tasks: [
          {
            taskName,
            taskDescription,
            dueDate,
          },
        ],
      };

      board.columns.push(newColumn);
    }

    await board.save();

    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// to find tasks of columnID

app.get('/api/boards/:boardId/columns/:columnName/tasks', async (req, res) => {
  const { boardId, columnName } = req.params;

  try {
    const board = await boardModel.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const column = board.columns.find((col) => col.name === columnName);

    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    res.status(200).json(column.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
