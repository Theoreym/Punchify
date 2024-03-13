const Team = require("../models/teamModel");

module.exports = {
    getList: async (req, res) => {
        const navTeamManage = true;
        const team = await Team.findAll({ raw: true });
        //console.log(team);
        res.render('team_manage', {team, navTeamManage})
    },

    postCreate: async (req, res) => {
        //console.log(req.body)
        await Team.create({
            team_wording: req.body.team_wording.toLowerCase(),
            weight_min: req.body.weight_min,
            weight_max: req.body.weight_max
        })
        res.redirect('back')
    },

    postUpdate: async  (req, res) => {
        await Team.update({
            team_wording: req.body.team_wording_update.toLowerCase(),
            weight_min: req.body.weight_min_update,
            weight_max: req.body.weight_max_update
            },{where: {id_team: req.params.id_team}
        });
        res.redirect('back');
    },

    postDelete: async  (req, res) => {
        await Team.destroy({
            where:{id_team: req.params.id_team}
        });
        res.redirect('back');
    }
}