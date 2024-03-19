const Adherent = require("../models/adherentModel")
const Team = require("../models/teamModel")
const Injury = require("../models/injuryModel")
module.exports = {
    addMeeting: async (req, res) => {
        try {
            const ad = await Adherent.findAll({ raw: true })
            res.render("coach_add_meeting", { ad })

        } catch (err) {
            console.error(err.message)
        }
    },
    injuryNotification: (req, res) => {
        res.render("coach_injury_notification")
    },
    injuryNotificationPost: async (req, res) => {
        try {
            const { adherentId, startDate, returnDate, message } = req.body
            await Injury.create({
                injury_wording: message,
                date_start: startDate,
                date_end: returnDate,
                id_adherent: adherentId
            })
            res.redirect("back")

        } catch (err) {
            //console.log(err.message);
            //res.sendStatus(500).send("Sending notifciation failed")
        }
    },
    meetingNotification: (req, res) => {
        res.render("coach_meeting_notification")
    },
    modifyTeam: async (req, res) => {
        try {
            const teams = await Team.findAll({ include: [{ model: Adherent }], raw: true, nest: true })
            const selectTeams = await Team.findAll({ raw: true })
            res.render("coach_modify_team", { teams, selectTeams })
        } catch (err) {
            //console.log(err.message)
            //res.sendStatus(500).send("Modification failed")
        }

    },
    modifyTeamPatch: async (req, res) => {
        try {
            const { id_adherent, newTeamId } = req.body
            await Adherent.update({ teamIdTeam: newTeamId }, {
                where: { id_adherent }
            });
            res.status(200).redirect("back");
        }
        catch (err) {
            console.log(err.message)
            res.status(500).send("Error modifying player's team.");

        }
    }

}