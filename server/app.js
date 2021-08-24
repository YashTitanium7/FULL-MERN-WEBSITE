const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require("express");
const app = express();

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log(`[+] Connection succesfull`);
}).catch((err) => console.log(`[-] Connection failed \n${err}`))

// Middleware
const middleware = (req, res, next) => {
  console.log(`This is the middleware`);
  next();
}

// Routes
app.get("/", function (req, res) {
  res.send("<h1>hello world</h1>");
});
app.get("/about", middleware, function (req, res) {
  res.send("<h1>About</h1>");
});
app.get("/contact", function (req, res) {
  res.send("<h1>Contact</h1>");
});
app.get("/signup", function (req, res) {
  res.send("<h1>Register</h1>");
});
app.get("/signin", function (req, res) {
  res.send("<h1>Login</h1>");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
