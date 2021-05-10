const admin = require("firebase-admin");

const { generateLogger, getCurrentFilename } = require("../logger");
const logger = generateLogger(`Middlewear - ${getCurrentFilename(__filename)}`);

const authCheck = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const arr = authorization.split(" ");
    if (arr.length === 2) {
      const token = arr[1];

      admin
        .auth()
        .verifyIdToken(token)
        .then((user) => {
          console.log(user);
        });
    }
  }
  next();
};

module.exports = authCheck;
