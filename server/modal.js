const mongoose = require("mongoose");

// Notification schema and model
const notificationSchema = new mongoose.Schema({
  message: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = {
  Notification,
};
