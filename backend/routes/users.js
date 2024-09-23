const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
} = require("../controllers/users/registration");

router.post("/users/register", userRegistration);
router.post("/users/login", userLogin);

module.exports = router;
