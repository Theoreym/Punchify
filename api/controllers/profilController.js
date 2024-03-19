const Profil = require("../models/profilModel");

module.exports = {
    getList: async (req, res) => {
        const navProfilManage = true;
        const profil = await Profil.findAll({ raw: true });
        //console.log(profil);
<<<<<<< HEAD
        res.render('profil_manage', {profil, navProfilManage});
    },

    postCreate: async (req, res) => {
        //console.log(req.body);
        await Profil.create({
            profil_code: req.body.profil_code.toLowerCase(),
            profil_wording: req.body.profil_wording.toLowerCase(),
            isAdmin: req.body.profil_isAdmin
        });
        res.redirect('back');
=======
        res.render('profil_manage', {profil, navProfilManage})
    },

    postCreate: async (req, res) => {
        //console.log(req.body)
        await Profil.create({
            profil_code: req.body.profil_code.toLowerCase(),
            profil_wording: req.body.profil_wording.toLowerCase()
        })
        res.redirect('back')
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
    },

    postUpdate: async  (req, res) => {
        await Profil.update({
            profil_code: req.body.profil_code_update.toLowerCase(),
<<<<<<< HEAD
            profil_wording: req.body.profil_wording_update.toLowerCase(),
            isAdmin: req.body.profil_isAdmin
=======
            profil_wording: req.body.profil_wording_update.toLowerCase()
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
            },{where: {id_profil: req.params.id_profil}
        });
        res.redirect('back');

    },

    postDelete: async  (req, res) => {
        await Profil.destroy({
            where:{id_profil:req.params.id_profil}
        });
        res.redirect('back');
<<<<<<< HEAD
    }
};
=======
    },

    getProfilBoxer: async (req, res) => {
        const profilBoxer = await Profil.findOne({ raw: true });
        res.render('profil_boxer', {profilBoxer})
    },
}
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
