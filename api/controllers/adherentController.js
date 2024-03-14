const Adherent = require("../models/adherentModel");

module.exports = {
    getInscription: async (req, res) => {
        const navAdherentInscription = true;
        res.render('adherent_inscription', {navAdherentInscription});
    },

    postCreate: async (req, res) => {
        //console.log(req.body);
        await Adherent.create({
            lastname:  req.body.lastname.toUpperCase(),
            firstname: req.body.firstname,
            genre: req.body.radioGenre,
            birthdate: req.body.birthdate,
            size: req.body.size,
            weight: req.body.weight,
            email: req.body.email,
            phone: req.body.phone,
            address_number: req.body.address_number,
            address_wording: req.body.address_wording,
            postal_code: req.body.postal_code,
            city: req.body.city.toUpperCase(),
            tutor_lastname: req.body.tutor_lastname,
            tutor_firstname: req.body.tutor_firstname,
            tutor_email: req.body.tutor_email,
            tutor_phone: req.body.tutor_phone
        });
        res.redirect('/');
    }
};