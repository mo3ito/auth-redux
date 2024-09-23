const express = require("express");
const configureServer = require("./config/serverConfig");
const app = express();
const {port} = require("./endpoint");
require("dotenv").config();
configureServer(app);

app.listen(port, () => console.log(`Server has run on port ${port}`));
