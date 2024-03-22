const Adherent = require("../models/adherentModel");
const Injury = require("../models/injuryModel");
const Category = require("../models/categoryModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

const { Op } = require('sequelize');
const ParticipateEvent = require("../models/participateEventModel");
const Event = require("../models/eventModel");

const { validationResult } = require('express-validator');

module.exports = {
    getInscription: async (req, res) => {
        const navAdherentInscription = true;
        res.render('adherent_inscription', {navAdherentInscription});
    },

    postCreateByUser: async (req, res) => {
        const userConnected = req.session.email;

        if (!userConnected) { 
            res.redirect("/login");
        } else {
            const user = await User.findOne({
                where:
                {
                    email: req.session.email
                },  raw: true
            });
            console.log(user)

            // Résultat traitement Express Validator
            const result = validationResult(req);
            console.log(result);
        
            if (!result.isEmpty()) {
                const navAdherentInscription = true;

                //console.log(result.errors[0].msg);
                const lastname = req.body.lastname.toUpperCase();
                const firstname = req.body.firstname;
                const genre = req.body.radioGenre;
                const birthdate = req.body.birthdate;
                const size = req.body.size;
                const weight = req.body.weight;
                const phone = req.body.phone;
                const address_number = req.body.address_number;
                const address_wording = req.body.address_wording;
                const postal_code = req.body.postal_code;
                const city = req.body.city.toUpperCase();
                res.render('adherent_inscription', { lastname, firstname, genre, birthdate, size, weight, phone, address_number, address_wording, postal_code, city, navAdherentInscription, 'errors': result.errors });
                //res.redirect('back')
            } else {
                // const user = 1;
                //console.log(req.body);
                await Adherent.create({
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
                    userIdUser: user.id_user     
                    });
                res.redirect('/');
            }
        }
    },

    postCreate: async (req, res) => {
        const result = validationResult(req);
        console.log(result);

        if (!result.isEmpty()) {
            const navAdherentManage = true;

            //console.log(result.errors[0].msg);
            const lastname = req.body.lastname.toUpperCase();
            const firstname = req.body.firstname;
            const genre = req.body.radioGenre;
            const birthdate = req.body.birthdate;
            const size = req.body.size;
            const weight = req.body.weight;
            const phone = req.body.phone;
            const address_number = req.body.address_number;
            const address_wording = req.body.address_wording;
            const postal_code = req.body.postal_code;
            const city = req.body.city.toUpperCase();
            const isValidate = req.body.radioIsValidate;
            const userIdUser = req.body.userIdUser;
            console.log(userIdUser)
            const categoryIdCategory = req.body.categoryIdCategory;
            console.log(categoryIdCategory);
            const teamIdTeam = req.body.teamIdTeam;
            console.log(teamIdTeam);

            const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
            const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
            const users = await User.findAll({ order: [['email', 'ASC']], raw: true });
            res.render('adherent_add_update', { lastname, firstname, genre, birthdate, size, weight, phone, address_number, address_wording, postal_code, city, isValidate, userIdUser, categoryIdCategory, teamIdTeam, categories, teams, users, navAdherentManage, 'errors': result.errors });
            //res.redirect('back')
        } else {
            const navAdherentManage = true;

            await Adherent.create({
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
            });
            //console.log(adherent)

            const adherent = await Adherent.findAll({ raw: true });
            res.render('adherent_manage', {adherent, navAdherentManage});
            // res.redirect('/');
        }

    },

    getList: async function (req,res) {
        const navAdherentManage = true;
        const adherent = await Adherent.findAll({ raw: true });
        //console.log(adherent);
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
        await Adherent.update({
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
        //console.log(adherent)
        res.redirect('/adherent/manage');
    }, 

    postDelete: async (req, res) => {
        //console.log('coucou')
        //console.log(req.params.id_adherent);
        await Adherent.destroy({
            where:{id_adherent: req.params.id_adherent}
        });
        res.redirect('/adherent/manage');
    },

    getGroups: async (req, res) => {
        const navAdherentGroups = true;

        const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
        const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });

        res.render('adherent_groups_manage', { categories, teams, navAdherentGroups });
    },

    getGroupsList: async function (req,res) {
        const navAdherentGroups = true;

        const categoryIdCategoryRequest = req.body.categoryIdCategory;
        const teamIdTeamRequest = req.body.teamIdTeam;
        // console.log(categoryIdCategoryRequest);
        // console.log(teamIdTeamRequest);

        const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
        const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
        //const adherentsAll = await Adherent.findAll({ order: [['lastname', 'ASC']], raw: true });
        //console.log(adherentsAll);

        if (categoryIdCategoryRequest !== '0' && teamIdTeamRequest !== '0') {
            const adherents = await Adherent.findAll({
                where: { 
                    [Op.and]: [
                        {categoryIdCategory: req.body.categoryIdCategory},
                        {teamIdTeam: req.body.teamIdTeam}
                    ]
                }, raw: true
            }
            ); 

            const adherentsIds = adherents.map(adherent => adherent.id_adherent);
            const adherentsAll = await Adherent.findAll({
                where: {
                    id_adherent: {
                        [Op.notIn]: adherentsIds
                    }
                },
                order: [['lastname', 'ASC']],
                raw: true
            });
            
            const listSelected = 1; 
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected});    
        } 

        if (categoryIdCategoryRequest !== '0' && teamIdTeamRequest === '0') {
            const adherents = await Adherent.findAll({
                where: { 
                        categoryIdCategory: req.body.categoryIdCategory
                }, raw: true
            });

            const adherentsIds = adherents.map(adherent => adherent.id_adherent);
            const adherentsAll = await Adherent.findAll({
                where: {
                    id_adherent: {
                        [Op.notIn]: adherentsIds
                    }
                },
                order: [['lastname', 'ASC']],
                raw: true
            });

            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected});    
        }

        if (categoryIdCategoryRequest === '0' && teamIdTeamRequest !== '0') {
            const adherents = await Adherent.findAll({
                where: { 
                        teamIdTeam: req.body.teamIdTeam
                }, raw: true
            });

            const adherentsIds = adherents.map(adherent => adherent.id_adherent);
            const adherentsAll = await Adherent.findAll({
                where: {
                    id_adherent: {
                        [Op.notIn]: adherentsIds
                    }
                },
                order: [['lastname', 'ASC']],
                raw: true
            });

            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected});    
        }  
    },

    postAddToGroups: async function (req,res) {
        const navAdherentGroups = true;

        // console.log(req.params);
        // console.log(req.body);

        const id_categorySelected = req.params.id_categorySelected;
        const id_teamSelected = req.params.id_teamSelected;

        if (id_categorySelected !== '0' && id_teamSelected !== '0') {
            await Adherent.update({
                categoryIdCategory: req.params.id_categorySelected,
                teamIdTeam: req.params.id_teamSelected
            },{where: {id_adherent: req.body.adherentsAll}
            });

            const categoryIdCategoryRequest = req.params.id_categorySelected;
            const teamIdTeamRequest = req.params.id_teamSelected;
            const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
            const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
            //const adherentsAll = await Adherent.findAll({ order: [['lastname', 'ASC']], raw: true });

            const adherents = await Adherent.findAll({
                where: { 
                    [Op.and]: [
                        {categoryIdCategory: req.params.id_categorySelected},
                        {teamIdTeam: req.params.id_teamSelected}
                    ]
                }, raw: true
            }
            ); 

            const adherentsIds = adherents.map(adherent => adherent.id_adherent);
            const adherentsAll = await Adherent.findAll({
                where: {
                    id_adherent: {
                        [Op.notIn]: adherentsIds
                    }
                },
                order: [['lastname', 'ASC']],
                raw: true
            });

            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected}); 
        }

        if (id_categorySelected !== '0' && id_teamSelected === '0') {
            await Adherent.update({
                categoryIdCategory: req.params.id_categorySelected
            },{where: {id_adherent: req.body.adherentsAll}
            });

            const categoryIdCategoryRequest = req.params.id_categorySelected;
            const teamIdTeamRequest = req.params.id_teamSelected;
            const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
            const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
            //const adherentsAll = await Adherent.findAll({ order: [['lastname', 'ASC']], raw: true });

            const adherents = await Adherent.findAll({
                where: { 
                        categoryIdCategory: req.params.id_categorySelected
                }, raw: true
            }); 

            const adherentsIds = adherents.map(adherent => adherent.id_adherent);
            const adherentsAll = await Adherent.findAll({
                where: {
                    id_adherent: {
                        [Op.notIn]: adherentsIds
                    }
                },
                order: [['lastname', 'ASC']],
                raw: true
            });

            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected}); 
        }

        if (id_categorySelected === '0' && id_teamSelected !== '0') {
            await Adherent.update({
                teamIdTeam: req.params.id_teamSelected
            },{where: {id_adherent: req.body.adherentsAll}
            });

            const categoryIdCategoryRequest = req.params.id_categorySelected;
            const teamIdTeamRequest = req.params.id_teamSelected;
            const categories = await Category.findAll({ order: [['age_min', 'ASC']], raw: true });
            const teams = await Team.findAll({ order: [['weight_max', 'ASC'],['weight_min', 'ASC']], raw: true });
            //const adherentsAll = await Adherent.findAll({ order: [['lastname', 'ASC']], raw: true });

            const adherents = await Adherent.findAll({
                where: { 
                        teamIdTeam: req.params.id_teamSelected
                }, raw: true
            });

            const adherentsIds = adherents.map(adherent => adherent.id_adherent);
            const adherentsAll = await Adherent.findAll({
                where: {
                    id_adherent: {
                        [Op.notIn]: adherentsIds
                    }
                },
                order: [['lastname', 'ASC']],
                raw: true
            });

            const listSelected = 1;
            res.render('adherent_groups_manage', {adherents, categories, teams, categoryIdCategoryRequest, teamIdTeamRequest, adherentsAll, navAdherentGroups, listSelected}); 
        }
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