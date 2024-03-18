const Adherent = require('../models/adherentModel');
const Category = require('../models/categoryModel');
const Convoke = require("../models/convokeModel");
const Event = require('../models/eventModel');
const EventType = require("../models/eventTypeModel");
const Injury = require('../models/injuryModel');
const ParticipateEvent = require('../models/participateEventModel');
const Profil = require('../models/profilModel');
const Team = require('../models/teamModel');
const User = require('../models/userModel');


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    res.render('home')
  }
}