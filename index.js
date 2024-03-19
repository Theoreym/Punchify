const express = require('express');
const {engine, ExpressHandlebars} = require('express-handlebars');
const session = require('express-session');

const SequelizeStore = require("connect-session-sequelize")(session.Store);

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
  

app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});