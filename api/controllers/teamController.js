const Team = require("../models/teamModel");

const { validationResult } = require('express-validator');

module.exports = {
    getList: async (req, res) => {
        const navTeamManage = true;
        const team = await Team.findAll({ raw: true });
        //console.log(team);
        res.render('team_manage', {team, navTeamManage});
    },

    postCreate: async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const navTeamManage = true;
            const team = await Team.findAll({ raw: true });

            const team_wording = req.body.team_wording;
            const weight_min = req.body.weight_min;
            const weight_max = req.body.weight_max;
            res.render('team_manage', { team, navTeamManage, team_wording, weight_min, weight_max, 'errors': result.errors })
            //return res.status(400).json({ errors:  result.array() });
            
        } else {
             //console.log(req.body);
            await Team.create({
            team_wording: req.body.team_wording.toLowerCase(),
            weight_min: req.body.weight_min,
            weight_max: req.body.weight_max
            });

            const navTeamManage = true;
            const team = await Team.findAll({ raw: true });
            res.render('team_manage', {team, navTeamManage});
            //res.redirect('back');
        }
    },

    postUpdate: async  (req, res) => {
        await Team.update({
            team_wording: req.body.team_wording_update.toLowerCase(),
            weight_min: req.body.weight_min_update,
            weight_max: req.body.weight_max_update
            },{where: {id_team: req.params.id_team}
        });

        const navTeamManage = true;
        const team = await Team.findAll({ raw: true });
        res.render('team_manage', {team, navTeamManage});
        //res.redirect('back');
    },

    postDelete: async  (req, res) => {
        await Team.destroy({
            where:{id_team: req.params.id_team}
        });
        
        const navTeamManage = true;
        const team = await Team.findAll({ raw: true });
        res.render('team_manage', {team, navTeamManage});
        //res.redirect('back');
    }
};