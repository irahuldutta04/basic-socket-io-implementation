const express = require("express");
const { createProductController, createNotification } = require("./controller");

const router = (io) => {
  const router = express.Router();

  // route to create a new product
  router.post("/createProduct", (req, res) => {
    createProductController(io, req, res);
  });

  // get all Notification
  router.get("/notifications", (req, res) => {
    createNotification(io, req, res);
  });

  return router;
};

module.exports = router;
