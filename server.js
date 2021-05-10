// importing
require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const { generateLogger, getCurrentFilename } = require("./logger.js");
const cors = require("cors");

const MessageModel = require("./db/models/MessageModel");

// routes
const userRoutes = require("./routes/user");

// set logger
const logger = generateLogger(getCurrentFilename(__filename));

// app config
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// ????

// health check route
app.get("/", (req, res) => {
  res.status(200).send("Whatsapp clone api v1");
});

// user routes
app.use("/api/v1/user", userRoutes);

// add message
app.post("/api/v1/message", (req, res) => {
  const message = req.body;
  MessageModel.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listeners
app.listen(port, () => {
  logger.info(`SERVER LISTENING ON PORT : ${port}`);
});
