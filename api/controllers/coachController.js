const Adherent = require("../models/adherentModel")
const Event = require ("../models/eventModel")
module.exports = {
    addMeeting: async (req, res) => {
        try {
            const ad = await Adherent.findAll({ raw: true })
            res.render("coach_add_meeting", { ad })

        } catch (err) {
            console.error(err.message)
        }
    },
    // addMeetingPost: async (req, res) => {
    //     try{
    //         const {time, message, date} = req.body
    //         await Event.create({
    //             event_wording: message,
    //             date_Start: date,
    //             time_start: time
    //         })
    //     }catch(err){
    //         console.log(err.message)
    //     }
    // },
    injuryNotification: (req, res) => {
        res.render("coach_injury_notification")
    },
    meetingNotification: (req, res) => {
        res.render("coach_meeting_notification")
    }
}




