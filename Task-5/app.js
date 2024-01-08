const express = require("express");
const app = express();
const PORT = 9000 || 3000;
const passport = require("passport")
const path = require("path");

app.use(passport.initialize());

app.use('./users',require('./router/users'));