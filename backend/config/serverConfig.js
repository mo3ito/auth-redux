const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");
const connectToDatabase = require("./database");
const Users = require("../routes/users");
const StartServer = require("../routes/index");


const configureServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  app.use(express.static(path.join(__dirname, "../public")));
  app.use("/", StartServer);
  app.use("/", Users);
  connectToDatabase();
};

module.exports = configureServer;
