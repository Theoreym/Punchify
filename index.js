
const session = require('express-session')


let SequelizeStore = require("connect-session-sequelize")(session.Store);

const express = require('express')
const {engine} = require('express-handlebars')

const path = require('path')
const router = require('./api/router')
const config = require('./config')


const app = express()
const port = 3000

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use('/css', express.static(path.join(__dirname, 'assets/css')))
app.use('/js', express.static(path.join(__dirname, 'assets/js')))

try {
  config.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);



app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/', router)


app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`)
})