const Adherent = require('../models/adherentModel');
const ParticipateEvent = require('../models/participateEventModel');
const Event = require('../models/EventModel');
const Category = require('../models/categoryModel');
const Injury = require('../models/injuryModel');
const Team = require('../models/teamModel');
const User = require('../models/userModel');
const Convoke = require("../models/convokeModel");
const Enable = require("../models/enableModel")
const EventType = require("../models/eventTypeModel");
const Manage = require('../models/manageModel');
const Profil = require('../models/profilModel');


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    res.render('home')
  }
}