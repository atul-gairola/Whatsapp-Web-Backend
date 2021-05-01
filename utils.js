const path = require("path");

exports.getCurrentFilename = (filename) => {
  path.basename(filename);
};
