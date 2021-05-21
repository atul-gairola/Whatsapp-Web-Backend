// importing
require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const { generateLogger, getCurrentFilename } = require("./logger.js");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./whatsappCloneKey.json");

// initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const MessageModel = require("./db/models/MessageModel");

// routes
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

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

// chat routes
app.use("/api/v1/chat", chatRoutes);

// chat routes
app.use("/api/v1/chat", messageRoutes);

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
