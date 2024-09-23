const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
  getCurrentUserInfos
} = require("../controllers/users/registration");

router.post("/users/register", userRegistration);
router.post("/users/login", userLogin);
router.get("/users/get-curent-user-infos", getCurrentUserInfos);

module.exports = router;
