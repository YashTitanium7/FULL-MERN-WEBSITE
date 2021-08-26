const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

require("../db/conn");
const User = require("../model/userSchema");

// home
router.get("/", function (req, res) {
  res.send("<h1>hello world from router.</h1>");
});

// registeration
router.post("/register", async (req, res) => {
  // destructuring
  const { name, email, phone, work, password, cpassword } = req.body;
  // validation
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ erros: "All fields must be filled" });
  }
  // checking and uploading to database
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: "e-mail already exists" });
    } else {
      if (password !== cpassword) {
        res.status(422).json({ error: "Please confirm your password" })
      } else {
        const user = new User({ name, email, phone, work, password, cpassword });
        const userRegister = await user.save();
        res.status(201).json({ message: "user registered successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/signin", async (req, res) => {
  // destructuring
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    return res.status(400).json({ error: "Invalid Credentials" });
  }
  try {
    // checking and confirming username and password
    const userLogin = await User.findOne({ email });

    const token = await userLogin.generateAuthToken()
    console.log(token)
    res.cookie("jwtoken", token, {
      httpOnly: true
    })
    if (userLogin) {
      const compare = await bcrypt.compare(password, userLogin.password);
      if (!compare) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User Login Successfully" });
      }
    } else {
      res.status(422).json({ error: "Invalid Credentials" })
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
