

module.exports = {
    addMeeting: (req, res) => {
        res.render("coach_add_meeting")
    },
    // addMeetingPost: (req, res) => {
    //     res.render("coach_add_meeting")
    // }
    injuryNotification: (req, res) => {
        res.render("coach_injury_notification")
    },
    meetingNotification: (req, res) => {
        res.render("coach_meeting_notification")
    }
}




