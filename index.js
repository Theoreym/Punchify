const session = require('express-session')


let SequelizeStore = require("connect-session-sequelize")(session.Store);

const express = require('express')
const {engine} = require('express-handlebars')

const path = require('path');
const router = require('./api/router');
const config = require('./config');

const app = express();
const port = 3000;

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    ifCond: function (v1, v2, option) {
      if (v1===v2) {
        return option.fn(this)
      }
      return option.inverse(this)
    },
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
}))
app.set('view engine', 'hbs');


app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/img', express.static(path.join(__dirname, 'assets/img')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));


try {
  config.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
};

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


app.use(express.urlencoded({extended:true}));
app.use(express.json());
  
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 },
  store: new SequelizeStore({db: config.sequelize})
}))

app.use('*', (req, res, next)=>{
  if (req.session.email) {
    res.locals.email = req.session.email;
    res.locals.userId = req.session.userId;
    if (req.session.isAdmin){
      res.locals.isAdmin = req.session.isAdmin;
    }
  }
  next();
});

app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});