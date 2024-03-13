const Adherent = require('../models/adherentModel');
const ParticipateEvent = require('../models/participateEventModel');
const Event = require('../models/EventModel');
const Injury = require('../models/injuryModel');
const User = require('../models/userModel');
const Convoke = require("../models/convokeModel");
const Enable = require("../models/enableModel")
const Manage = require('../models/manageModel');
const Profil = require('../models/profilModel');


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
    res.render('home')
  }
}