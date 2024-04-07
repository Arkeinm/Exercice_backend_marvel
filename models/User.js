const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  account: {
    username: String,
    avatar: Object,
  },
  favorites: {
    favoriteCharacters: Array,
    favoriteComics: Array,
  },
  token: String,
  hash: String,
  salt: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
