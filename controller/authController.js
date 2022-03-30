const User = require("../models/userSchema");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SIGNUP;
exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //Check users
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400);
    res.json({
      Status: "User already exists",
    });
    throw new Error("User already exists");
  }

  const user = new User(req.body);
  await user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not being able to save user",
      });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
      role: user.role,
      // pass: user.encry_password,
    });
  });
};

// LOGIN/SIGNIN
exports.login = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  // console.log(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // to find email and password in DB
  await User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email dose not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(402).json({
        err: "Email or password do not match",
      });
    }

    // create token
    // The "SECRET" variable is hard coded here, but it should go into the .env file
    const SECRET = process.env.SECRET;
    const token = jwt.sign({ _id: user._id }, SECRET, {
      expiresIn: "10h",
    });

    // put token in cookie
    // res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to front end
    const { _id, firstName, lastName, email, role } = user;
    return res.json({
      token,
      user: {
        _id,
        firstName,
        lastName,
        email,
        role,
      },
    });
  });
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      Total: users.length,
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err: err.message,
    });
  }
};
// GET OWN PROFILE
exports.getMe = async (req, res) => {
  const { role, _id, firstName, lastName, email } = await User.findById(
    req.user._id
  );
  res.json({ role, _id, firstName, lastName, email });
};

// SIGNOUT
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "Success",
    message: "You signed out successfully",
  });
};
