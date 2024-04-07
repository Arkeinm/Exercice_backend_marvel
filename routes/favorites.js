const express = require("express");
const router = express.Router();
const isAuthenticated = require("../utils/isAuthenticated");

router.get("/favorites", isAuthenticated, async (req, res) => {
  if (req.owner) {
    try {
      const userConnected = req.owner;
      const favoriteCharacters = userConnected.favorites.favoriteCharacters;
      const favoriteComics = userConnected.favorites.favoriteComics;
      const response = {
        favoriteCharacters,
        favoriteComics,
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  else {
    const response = {
      favoriteCharacters: [],
      favoriteComics: [],
    };
    res.json(response)
  }
});

router.put("/favorites", isAuthenticated, async (req, res) => {
  try {
    const userConnected = req.owner;
    if (req.body.copyTabCharacters) {
      userConnected.favorites.favoriteCharacters = req.body.copyTabCharacters;
    } else if (req.body.copyTabComics) {
      userConnected.favorites.favoriteComics = req.body.copyTabComics;
    }
    userConnected.save();
    res.status(200).json({ Message: "Modification succeeded" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
