
const ParticipateEvent = require('../models/participateEventModel');
const Event = require('../models/eventModel');
const Injury = require('../models/injuryModel');
const User = require('../models/userModel');
const Convoke = require("../models/convokeModel");
const Enable = require("../models/enableModel")
const Manage = require('../models/manageModel');


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    res.render('home');
  }
};