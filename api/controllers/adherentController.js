const Adherent = require("../models/adherentModel");
const Category = require("../models/categoryModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");

module.exports = {
    getInscription: async (req, res) => {
        const navAdherentInscription = true;
        res.render('adherent_inscription', {navAdherentInscription});
    },

    postCreateByUser: async (req, res) => {
        // const user = await User.findOne({
        //     where:
        //     {
        //         id_user: req.session.id_user
        //     }
        // }, { raw: true });
        // //console.log(user);
        
        // if (!user) { 
        //     res.redirect(301, "/login");
        // }
        // else {
        //     //console.log(req.body);
        //     await Adherent.create({
        //         lastname:  req.body.lastname.toUpperCase(),
        //         firstname: req.body.firstname,
        //         genre: req.body.radioGenre,
        //         birthdate: req.body.birthdate,
        //         size: req.body.size,
        //         weight: req.body.weight,
        //         phone: req.body.phone,
        //         address_number: req.body.address_number,
        //         address_wording: req.body.address_wording,
        //         postal_code: req.body.postal_code,
        //         city: req.body.city.toUpperCase(),
        //         userIdUser: user.id_user      
        //     });
        //     res.redirect('/');
        // }

        const user = 1;
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
            userIdUser: user     
        });
        res.redirect('/');
    },

    postCreate: async (req, res) => {
        const adherent = await Adherent.create({
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
        console.log(adherent)
        res.redirect('/');
    },

    getList: async function (req,res) {
        const navAdherentManage = true;
        const adherent = await Adherent.findAll({ raw: true });
        //console.log(team);
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
        console.log(adherent)
        res.redirect('back');
    }, 

    postDelete: async (req, res) => {
        console.log('coucou')
        console.log(req.params.id_adherent);
        await Adherent.destroy({
            where:{id_adherent: req.params.id_adherent}
        });
        res.render('adherent_manage');
    }
}