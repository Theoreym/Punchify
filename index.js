const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const Handlebars = require("handlebars");
const path = require("path");

const app = express();





//* Setting the handlebar engine
app.engine('hbs', engine({ extname: "hbs" }));
app.set('view engine', 'hbs');
app.use("/assets", express.static(path.join(__dirname, "/assets"))); 
app.use("/css", express.static(path.join(__dirname, "assets/css"))); 
//* Json format for req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//*Morgan for tracking */
app.use(morgan('dev'));
PORT = 3300


app.listen(PORT, () => {
    console.log( `Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.render("test")
})