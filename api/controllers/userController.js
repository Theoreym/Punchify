const { body, validationResult } = require('express-validator');
const { Request, Response } = require('express');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
const User = require("../models/userModel");
const Profil = require('../models/profilModel')

module.exports = {
    get: (req, res) => {
        res.render("register")
    },
    post: async (req, res) => {
        try {
            // Création d'un nouvel utilisateur avec Sequelize
            const { email, password } = req.body;
            const newUser = await User.create({ email, password });
            // Réponse réussie
            //const successMessage = 'Utilisateur enregistré avec succès';
            //res.status(200).render('register', { success: successMessage });
            res.redirect("/login")
        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
            res.status(500).render('register', { error: 'Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur' });
        }
    },
    getLogin: (req, res) => {
        res.render("login")
    },
    postLogin: async (req, res) => {
        try {
            // Vérifier si un identifiant est fourni dans la requête
            if (!req.body.email || !req.body.password) {
                return res.render('login', { error: "Veuillez saisir votre adresse e-mail ou votre nom d'utilisateur ainsi que votre mot de passe." });
            }
    
            // Récupérer l'utilisateur par son email ou son nom d'utilisateur depuis la base de données
            
            // const user = await User.findOne({
            //     where: {
            //         [Op.or]: { email: req.body.email }
            //     } 
            // });

            let user = await User.findOne({
                where: {
                    email: req.body.email
                }, include : [{ model: Profil}]
            });
            user = user.toJSON()
            console.log(user)
    
            if (!user) {
                // Si aucun utilisateur n'est trouvé, retour à la page d'inscription 
                return res.status(401).render('login', { 'error': 'Identifiant incorrect'});
            }
    
            // Comparer les mots de passe
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err || !result) {
                    // Si la comparaison échoue, renvoi sur la page de connexion avec un message d'erreur
                    return res.status(401).render('login', { 'error': 'Mot de passe incorrect'});
                }
                req.session.email = user.email;
                req.session.id_user = user.id_user;
                req.session.id_profil = user.profil.id_profil;
                req.session.profil_code = user.profil.profil_code;
                req.session.profil_isAdmin = user.profil.isAdmin;

                // Si personne est admin
                // Si les mots de passe correspondent, enregistrer l'utilisateur dans la session
                console.log(req.session);
                
                res.redirect('/'); // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
            });
        } catch (error) {
            console.error("Erreur lors de la tentative de connexion :", error);
            res.status(500).render('login', { error: "Une erreur s'est produite lors de la connexion." });
        }
    },
    logout: (req, res)=>{
        req.session.destroy()
        res.redirect('/')
    },
    list: async (req, res) => {
        const navUserManage = true;
        const users = await User.findAll({include: [{model:Profil}], raw: true })
        console.log(users)
        const profiles = await Profil.findAll({ raw: true })
        res.render('user_manage', { users, profiles, navUserManage })
    },
    delete: (req, res) => {
        User.destroy({ where: { id_user: req.params.id_user } })
        res.redirect('/user/manage')
    },
    postUpdate: async (req, res) => {
                    await User.update({
                        email: req.body.email,
                        profilIdProfil: req.body.profil
                    },
                        {
                            where: {
                                id_user: req.params.id_user
                            }
                        }
                    )
                    res.redirect('/user/manage')
    }
}
