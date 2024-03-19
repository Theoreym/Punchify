const Adherent = require("../models/adherentModel")
const Team = require("../models/teamModel")
const Injury = require("../models/injuryModel")
const Event = require("../models/eventTypeModel")
const { Op } = require('sequelize');

module.exports = {
    addMeeting: async (req, res) => {
        try {
            const ad = await Adherent.findAll({ raw: true })
            res.render("coach_add_meeting", { ad })

        } catch (err) {
            console.error(err.message)
        }
    },
    addMeetingPost: async (req, res) => {
        try {
            const { adherentId, date, time, message } = req.body
            await Event.create({
                event_wording: message,
                date_start: date,
                time_start: time,
                place_name: adherentId,
                eventtypeIdEventType: eventType
            })
            res.redirect("back")

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
            console.log(err.message);
            res.sendStatus(500).send("Sending notifciation failed")
        }
    },
    meetingNotification: (req, res) => {
        res.render("coach_meeting_notification")
    },
    modifyTeam: async (req, res) => {
        try {
            const teams = await Team.findAll({
                include: [
                    {
                        model: Adherent,
                    }
                ],
                raw: true,
                nest: true
            });

            const selectTeams = await Team.findAll({ raw: true })
            console.log(teams)
            res.render("coach_modify_team", { teams, selectTeams })
        } catch (err) {
            console.log(err.message)
            res.sendStatus(500).send("Modification failed")
        }

    },
    modifyTeamPost: async (req, res) => {
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