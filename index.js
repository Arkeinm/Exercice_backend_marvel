require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const Login = require("./routes/user");
app.use(Login);

const Characters = require("./routes/characters");
app.use(Characters);

const Comics = require("./routes/comics");
app.use(Comics);

const Favorites = require("./routes/favorites")
app.use(Favorites)

app.all("*", function (req, res) {
  res.json({ message: "command not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
