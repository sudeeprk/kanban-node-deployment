# Kanban-Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) application for managing tasks using a Kanban board. The application consists of two main folders: `frontend` and `backend`. The `frontend` folder contains the React.js-based user interface, while the `backend` folder contains the Node.js-based server and the MongoDB database.

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Kanban-Application.git

2. Navigate to the project directory:

    ```bash 
    cd Kanban-Application

3. Install dependencies for the frontend:

    ```bash 
    cd frontend
    npm install

4. Install dependencies for the backend:

    ```bash
    cd ../backend
    npm install

### Configuration

1. Create a .env file in the backend folder and set the following variables:

    ```bash
    PORT=3001
    MONGODB_URI=mongodb://localhost:27017/kanban

2. Make sure your MongoDB server is running.

### Usage

1. Start the backend server:

    ```bash
    cd backend
    npm start
The server should now be running on http://localhost:3001

2. Start the frontend server:

    ```bash
    cd frontend
    npm run dev
The application should now be accessible at http://localhost:3000

### Features

Kanban Board: Manage tasks using a Kanban board with columns for "To Do," "In Progress," and "Done."

Task Details: View and edit task details, including title, description, and due date.

![Screenshot-from-2023-11-20-10-56-31.png](https://postimg.cc/zVzhvWLm)

### Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Push the changes to your fork.
5. Submit a pull request.

### Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Push the changes to your fork.
5. Submit a pull request.
