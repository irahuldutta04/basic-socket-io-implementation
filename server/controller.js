const { Notification } = require("./modal");

const createProductController = async (io, req, res) => {
  try {
    // Emit new product event
    io.emit("newProduct");

    // Store the notification in the database
    const newNotification = new Notification({
      message: "New product listed!",
      // If you have userId associated with the notification, you can add it here
    });

    // Save the notification to the database
    await newNotification.save();

    res.json({ message: "Product created" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createNotification = async (io, req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createProductController,
  createNotification,
};
