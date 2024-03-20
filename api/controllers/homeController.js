const ParticipateEvent = require('../models/participateEventModel');
const Event = require('../models/eventModel');
const Injury = require('../models/injuryModel');
const User = require('../models/userModel');
const Adherent = require('../models/adherentModel');
const Category = require('../models/categoryModel');
const Convoke = require("../models/convokeModel");
const EventType = require("../models/eventTypeModel");
const Profil = require('../models/profilModel');
const Team = require('../models/teamModel');


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    res.render('home');
  }
};