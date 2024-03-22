const Adherent = require("../models/adherentModel");
const Injury = require("../models/injuryModel");
const Category = require("../models/categoryModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const { Op } = require('sequelize');
const ParticipateEvent = require("../models/participateEventModel");
const Event = require("../models/eventModel");
module.exports = {
    getInscription: async (req, res) => {
        const navAdherentInscription = true;
        res.render('adherent_inscription', {navAdherentInscription});
    },
    postCreateByUser: async (req, res) => {
        const user = 1; // Temporary user ID for testing
        await Adherent.create({
            lastname: req.body.lastname.toUpperCase(),
            firstname: req.body.firstname,
            genre: req.body.radioGenre,
            birthdate: req.body.birthdate,
            size: req.body.size,
            weight: req.body.weight,
            phone: req.body.phone,
            address_number: req.body.address_number,
            address_wording: req.body.address_wording,
            postal_code: req.body.postal_code,
            city: req.body.city.toUpperCase(),
            userIdUser: user
        });
        res.redirect('/');
    },
    postCreate: async (req, res) => {
        const adherent = await Adherent.create({
            lastname: req.body.lastname.toUpperCase(),
            firstname: req.body.firstname,
            genre: req.body.radioGenre,
            birthdate: req.body.birthdate,
            size: req.body.size,
            weight: req.body.weight,
            phone: req.body.phone,
            address_number: req.body.address_number,
            address_wording: req.body.address_wording,
            postal_code: req.body.postal_code,
            city: req.body.city.toUpperCase(),
            isValidate: req.body.radioIsValidate,
            userIdUser: req.body.userIdUser,
            categoryIdCategory: req.body.categoryIdCategory,
            teamIdTeam: req.body.teamIdTeam
        });
        console.log(adherent);
        res.redirect('/');
    },
    getList: async function (req,res) {
        const navAdherentManage = true;
        const adherent = await Adherent.findAll({ raw: true });
        res.render('adherent_manage', {adherent, navAdherentManage});
    },
    getRead: async function (req,res) {
        const navAdherentManage = true;
        const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
        const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
        const users = await User.findAll({ order: [['email', 'ASC']], raw: true });
        if (!req.params.id_adherent){
            res.render('adherent_add_update', {categories, teams, users, navAdherentManage});
        } else {
            let adherent = await Adherent.findByPk(req.params.id_adherent, {
                include: [{
                    model: Category
                },{
                    model: Team
                },{
                    model: User
                }]
            }, { raw: true });
            adherent = adherent.toJSON();
            res.render('adherent_add_update', {adherent, categories, teams, users, navAdherentManage});
        }
    },
    postConfirmAdhesion: async (req, res) => {
        await Adherent.update({
            isValidate: 1
        }, {
            where: { id_adherent: req.params.id_adherent }
        });
        res.redirect('back');
    },
    postUpdate: async (req, res) => {
        const adherent = await Adherent.update({
            lastname:  req.body.lastname.toUpperCase(),
            firstname: req.body.firstname,
            genre: req.body.radioGenre,
            birthdate: req.body.birthdate,
            size: req.body.size,
            weight: req.body.weight,
            phone: req.body.phone,
            address_number: req.body.address_number,
            address_wording: req.body.address_wording,
            postal_code: req.body.postal_code,
            city: req.body.city.toUpperCase(),
            isValidate: req.body.radioIsValidate,
            userIdUser: req.body.userIdUser,
            categoryIdCategory: req.body.categoryIdCategory,
            teamIdTeam: req.body.teamIdTeam
        },{where: {id_adherent: req.params.id_adherent}
        });
        res.redirect('/adherent/manage');
    },
    postDelete: async (req, res) => {
        await Adherent.destroy({
            where:{id_adherent: req.params.id_adherent}
        });
        res.redirect('/adherent/manage');
    },
    getGroups: async (req, res) => {
        const navAdherentGroups = true;
        const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
        const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
        const users = await User.findAll({ order: [['email', 'ASC']], raw: true });
        res.render('adherent_groups_manage', { categories, teams, users, navAdherentGroups });
    },
    getGroupsList: async function (req,res) {
        const navAdherentGroups = true;
        const categoryIdCategoryRequest = req.body.categoryIdCategory;
        const teamIdTeamRequest = req.body.teamIdTeam;
        const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
        const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
        const adherentsAll = await Adherent.findAll({ order: [['lastname', 'ASC']], raw: true });
        if (!isNaN(categoryIdCategoryRequest) && !isNaN(teamIdTeamRequest)) {
            let adherents = await Adherent.findAll({
                where: {
                    [Op.and]: [
                        {categoryIdCategory: req.body.categoryIdCategory},
                        {teamIdTeam: req.body.teamIdTeam}
                    ]
                }, raw: true
            }
            );
            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, adherentsAll, teamIdTeamRequest, navAdherentGroups, listSelected});
        }
        if (isNaN(teamIdTeamRequest)) {
            const adherents = await Adherent.findAll({
                where: {
                        categoryIdCategory: req.body.categoryIdCategory
                }, raw: true
            });
            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, adherentsAll, navAdherentGroups, listSelected});
        }
        if (isNaN(categoryIdCategoryRequest)) {
            const adherents = await Adherent.findAll({
                where: {
                        teamIdTeam: req.body.teamIdTeam
                }, raw: true
            });
            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected});
        }
    },
    postAddToGroups: async function (req, res) {
        console.log(req.params);
        console.log(req.body);
        res.render('adherent_groups_manage');
    },
    getBlessure: async (req, res) => {
        let adherent = await Adherent.findByPk('1', {include: Injury});
        adherent = adherent.toJSON();
        console.log(adherent);
        res.render('absence', {adherent});
    },
    postBlessure: async (req, res) => {
        await Injury.create({
            injury_wording: req.body.blessure,
            date_start: req.body.date,
            date_end: req.body.dateFin,
            adherentIdAdherent : 1
        })
        res.redirect('/absence')
    },
    getProfilBoxer: async (req, res) => {
        let profilBoxer = await Adherent.findByPk(1, {raw:true});
        // console.log(profilBoxer);

        //les info de meeting
        let participations = await ParticipateEvent.findAll({where: {adherentIdAdherent : 1}}, {raw:true});
        // console.log(participations);
        let events = []
        for (let i = 0; i < participations.length; i++) {
            const participation = participations[i];
            events.push(await Event.findByPk(participation.eventIdEvent, {raw:true})) 
        }
        // console.log(events)

        res.render('profil_boxer', { profilBoxer, events });
    },
    postProfilUpdate: async (req, res) => {
        await Adherent.update({
            phone: req.body.numero,
            address_number: req.body.adresse,
            address_wording: req.body.adresse,
            postal_code: req.body.adresse,
            city: req.body.adresse
        }, {
            where: {
                id_adherent : req.params.id_adherent
            }
        })
        res.redirect('back');
    }
}