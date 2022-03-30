const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { subscribeUser } = require("../controller/subscribeController");
// const { isSignedIn } = require("../middleware/auth");

router.post(
  "/subscribe",
  [check("email").isEmail().withMessage("Must be a valid email id")],
  subscribeUser
);

module.exports = router;
