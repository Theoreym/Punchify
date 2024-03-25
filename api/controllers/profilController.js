const Profil = require("../models/profilModel");

const { validationResult } = require('express-validator');

module.exports = {
    getList: async (req, res) => {
        const navProfilManage = true;
        const profils = await Profil.findAll({ raw: true });
        //console.log(profil);
        res.render('profil_manage', {profils, navProfilManage});
    },

    postCreate: async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const navProfilManage = true;
            const profil = await Profil.findAll({ raw: true });

            const profil_code = req.body.profil_code;
            const profil_wording = req.body.profil_wording;
            const profil_isAdmin = req.body.profil_isAdmin;
            res.render('profil_manage', {profil, navProfilManage, profil_code, profil_wording, profil_isAdmin, 'errors': result.errors});
        } else {
            //console.log(req.body);
            await Profil.create({
            profil_code: req.body.profil_code.toLowerCase(),
            profil_wording: req.body.profil_wording.toLowerCase(),
            isAdmin: req.body.profil_isAdmin
            });

            const navProfilManage = true;
            const profil = await Profil.findAll({ raw: true });
            res.render('profil_manage', {profil, navProfilManage});
            //res.redirect('back');  
        }
    },

    postUpdate: async  (req, res) => {
        await Profil.update({
            profil_code: req.body.profil_code_update.toLowerCase(),
            profil_wording: req.body.profil_wording_update.toLowerCase(),
            isAdmin: req.body.profil_isAdmin
            },{where: {id_profil: req.params.id_profil}
        });

        const navProfilManage = true;
        const profil = await Profil.findAll({ raw: true });
        res.render('profil_manage', {profil, navProfilManage});
        //res.redirect('back');

    },

    postDelete: async  (req, res) => {
        await Profil.destroy({
            where:{id_profil:req.params.id_profil}
        });

        const navProfilManage = true;
        const profil = await Profil.findAll({ raw: true });
        res.render('profil_manage', {profil, navProfilManage});
        //res.redirect('back');
    }
};