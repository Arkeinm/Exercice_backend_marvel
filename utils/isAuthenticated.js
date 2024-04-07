const express = require("express");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const receivedToken = req.headers.authorization.replace("Bearer ", "");
    const userConnected = await User.findOne({ token: receivedToken });
    if (!userConnected) {
      return res.status(400).json({ message: "You are not connected" });
    } else {
      req.owner = userConnected;
      next();
    }
  }
  else {
    next();
  }
};

module.exports = isAuthenticated;
