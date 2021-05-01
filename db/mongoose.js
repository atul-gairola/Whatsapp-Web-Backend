const mongoose = require("mongoose");
const { generateLogger } = require("../logger");
const { getCurrentFilename } = require("../utils");

const logger = generateLogger(getCurrentFilename(__filename));

mongoose.connect(process.env.DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// On successful connection
mongoose.connection.on("connected", () => {
  logger.info("Connection established with the DB");
});

// on connection failure
mongoose.connection.on("error", (e) => {
  logger.error("Error connecting to the DB\n", e);
});

// when connection disconnected
mongoose.connection.on("disconnected", () => {
  logger.warn("Mongoose connection disconnected");
});

// if node process ends, close the connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.warn("Connection to the DB disconnected through app termination");
  });
  process.exit(0);
});

module.exports = mongoose;
