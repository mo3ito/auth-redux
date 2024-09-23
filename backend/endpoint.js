const port = process.env.PORT;
const host = process.env.HOST;
const mongoUri = process.env.MONGO_URI;
const jwtKey = process.env.JWT_KEY;


module.exports = {
  port,
  host,
  mongoUri,
  jwtKey,
};
