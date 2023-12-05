const express = require("express");

// my imports
const { register } = require('../controller/users');

const router = express.Router();

router.route("/register")
  .post(register)

module.exports = router;
