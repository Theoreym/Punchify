const Profil = require("../models/profilModel");

module.exports = {
    getList: async (req, res) => {
        const navProfilManage = true;
        const profil = await Profil.findAll({ raw: true });
        //console.log(profil);
        res.render('profil_manage', {profil, navProfilManage});
    },

    postCreate: async (req, res) => {
        //console.log(req.body);
        await Profil.create({
            profil_code: req.body.profil_code.toLowerCase(),
            profil_wording: req.body.profil_wording.toLowerCase()
        });
        res.redirect('back');
    },

    postUpdate: async  (req, res) => {
        await Profil.update({
            profil_code: req.body.profil_code_update.toLowerCase(),
            profil_wording: req.body.profil_wording_update.toLowerCase()
            },{where: {id_profil: req.params.id_profil}
        });
        res.redirect('back');

    },

    postDelete: async  (req, res) => {
        await Profil.destroy({
            where:{id_profil:req.params.id_profil}
        });
        res.redirect('back');
    }
};