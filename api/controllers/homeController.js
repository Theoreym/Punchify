<<<<<<< HEAD

const ParticipateEvent = require('../models/participateEventModel');
const Event = require('../models/eventModel');
const Injury = require('../models/injuryModel');
const User = require('../models/userModel');
const Convoke = require("../models/convokeModel");
=======
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
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a


module.exports = {
  get: async (req, res) => {
    // console.log(req.session);
<<<<<<< HEAD
    res.render('home');
  }
};
=======
    res.render('home')
  }
}
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
