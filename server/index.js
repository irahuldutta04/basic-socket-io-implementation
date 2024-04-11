const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const { createProductController, createNotification } = require("./controller");
const socketHandlers = require("./socketHandlers");
const router = require("./routes");

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/notification-demo");
const db = mongoose.connection;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the notification server",
  });
});

// Pass the `io` instance to the router
app.use("/", router(io));

// Load Socket.io event handlers
socketHandlers(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
