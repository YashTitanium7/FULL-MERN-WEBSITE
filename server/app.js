const dotenv = require('dotenv')
const express = require("express");
const app = express();

dotenv.config({path:'./config.env'})
require('./db/conn')
// const User = require('./model/userSchema');

app.use(express.json())

const PORT = process.env.PORT

// Link for the Router file
app.use(require('./router/auth'))

// Middleware
const middleware = (req, res, next) => {
  console.log(`This is the middleware`);
  next();
}

// Routes
app.get("/contact", function (req, res) {
  res.send("<h1>Contact</h1>");
});
app.get("/signup", function (req, res) {
  res.send("<h1>Register</h1>");
});
app.get("/signin", function (req, res) {
  res.send("<h1>Login</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
