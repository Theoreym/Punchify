const { get } = require("./homeController");

module.exports = {
    get: (req, res) => {
        res.render("login")
    }
}