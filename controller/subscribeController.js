// Subscribe
const Subscribe = require("../models/subscribeSchema");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

// SUBSCRIBE;
exports.subscribeUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const subscribe = new Subscribe(req.body);
  await subscribe.save((err, subscribe) => {
    if (err) {
      return res.status(400).json({
        err: "Not being able to save subscriber",
      });
    }
    res.json({
      email: subscribe.email,
    });
  });
};
