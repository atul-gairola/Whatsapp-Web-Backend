// importing
require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const { generateLogger } = require("./logger.js");
const { getCurrentFilename } = require("./utils");
const cors = require("cors");

const MessageModel = require("./db/models/MessageModel");

// set logger
const logger = generateLogger(getCurrentFilename(__filename));

// app config
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// ????

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

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
