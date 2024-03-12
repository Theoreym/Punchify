const express = require('express')
const router = express.Router()

const homeController = require("./controllers/homeController")
const loginController = require('./controllers/loginController')

router.route('/')
.get(homeController.get)


//* Login 
router.route("/login")
.get(loginController.get)
module.exports = router
