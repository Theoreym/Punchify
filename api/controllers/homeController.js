
const ParticipateEvent = require('../models/participateEventModel');
const Event = require('../models/eventModel');
const Injury = require('../models/injuryModel');
const User = require('../models/userModel');
const Convoke = require("../models/convokeModel");

// Middleware
const authenticate = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    res.render('home');
  }
};