const express = require("express");

// my imports
const {
  register,
  login
} = require('../controller/users');

const router = express.Router();

router.route("/register").post(register)

router.route("/login").post(login)

module.exports = router;
