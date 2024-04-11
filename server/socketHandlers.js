// socketHandlers.js
// Import your Notification model

const { Notification } = require("./modal");

const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for new product event
    socket.on("newProduct", async () => {
      // Create a new notification
      const newNotification = new Notification({
        message: "New product listed!",
        userId: socket.userId, // Assuming you have userId associated with the socket
      });

      // Save the notification to the database
      await newNotification.save();

      // Emit notification to all connected clients
      io.emit("notification", "New product listed!");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = socketHandlers;
