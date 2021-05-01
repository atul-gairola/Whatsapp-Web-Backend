// importing
require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const { generateLogger } = require("./logger.js");
const { getCurrentFilename } = require("./utils");
// set logger
const logger = generateLogger(getCurrentFilename(__filename));

// app config
const app = express();
const port = process.env.PORT || 8000;

// middleware

// DB config

// ????

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// listeners
app.listen(port, () => {
  logger.info(`SERVER LISTENING ON PORT : ${port}`);
});
