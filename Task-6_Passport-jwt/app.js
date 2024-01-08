const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
// const cookieparser = require("cookie-parser")
const DB_URL = "mongodb://127.0.0.1:27017/Task";
const PORT = 9000 || 3000;
require("dotenv").config();


mongoose.connect(DB_URL).then(() => {
    console.log("DB Connected");
})

const passport = require("passport")
app.use(passport.initialize());

app.use(express.json())
// app.use(cookieparser())

app.use("/",require("./router/router"))

app.listen(PORT, () => {
    console.log("Server running on PORT:" + PORT);
})