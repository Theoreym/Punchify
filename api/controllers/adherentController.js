const Adherent = require("../models/adherentModel");
const Injury = require("../models/injuryModel");
const { Op } = require('sequelize');

module.exports = {
    get: async (req, res) => {
        // res.render('absence'); 
        // Récupérer les adhérents depuis la base de données
        const adherent = await Adherent.findByPk('1', {include: [{model: Injury}], raw: true, nest: true});
        console.log(adherent);
        

        // Rendre la vue avec les données récupérées
        res.render('absence', {adherent}); 
    },

    post: async (req, res) => {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const blessure = req.body.blessure;
        const date = req.body.date;
        const dateFin = req.body.dateFin;
        // const id_adherent = req.session.id;

        try {
            const existingAdherent = await Adherent.findOne({
                where: {
                    [Op.and]: [
                        { lastname: nom },
                        { firstname: prenom }
                    ]
                }
            });

            const newInjury = await Injury.create({
                injury_wording: blessure,
                date_start: date,
                date_end: dateFin,
                id_adherent: existingAdherent.id
            });
            console.log('Nouvelle blessure enregistrée :', newInjury);

            res.redirect('back');
        } catch (error) {
            console.error("Une erreur est survenue lors de l'enregistrement :", error);
            res.status(500).send("Une erreur est survenue lors de l'enregistrement des données : " + error.message);
        }
    }
}
