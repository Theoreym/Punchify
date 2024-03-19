const Team = require("../models/teamModel");

module.exports = {
    getList: async (req, res) => {
        const navTeamManage = true;
        const team = await Team.findAll({ raw: true });
        //console.log(team);
<<<<<<< HEAD
        res.render('team_manage', {team, navTeamManage});
    },

    postCreate: async (req, res) => {
        //console.log(req.body);
=======
        res.render('team_manage', {team, navTeamManage})
    },

    postCreate: async (req, res) => {
        //console.log(req.body)
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
        await Team.create({
            team_wording: req.body.team_wording.toLowerCase(),
            weight_min: req.body.weight_min,
            weight_max: req.body.weight_max
<<<<<<< HEAD
        });
        res.redirect('back');
=======
        })
        res.redirect('back')
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
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
<<<<<<< HEAD
};
=======
}
>>>>>>> dc26be2b771865a997db1627b63cf2d258d5681a
