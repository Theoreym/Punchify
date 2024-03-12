const express = require('express')
const router = express.Router()

const homeController = require("./controllers/homeController")

router.route('/')
    .get(homeController.get)

module.exports = router
