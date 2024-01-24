import express from 'express';
import models from './models/index.js';
import bodyParser from 'body-parser';


const App = express();
const Port = "9000";
const Ip = "127.0.0.1";  //"localhost geht an der Stelle auch"

//Datenbank auch ma anlegen:
models.sequelize.sync({alter: true});

/* //befüllen:
models.cd.destroy({ truncate: true })
.then( () => {
    models.cd.bulkCreate(
    [
        {
        id: 1,
        title: "Planet Pink",
        artist: "J.B.O.",
        country: "Deutschland",
        company: "AFM Records",
        price: 17.99,
        year: 2021
        },
        {
        id: 2,
        title: "Live in Bochum",
        artist: "Böhse Onkels",
        country: "Deutschland",
        company: "Matapaloz",
        price: 14.99,
        year: 2017
        },
        {
        id: 3,
        title: "The Beard Album",
        artist: "The Beards",
        country: "Australien",
        company: "Eigenverlag",
        price: 29.99,
        year: 2014
        }     
    ]
)}); */

//EJS + BodyParser
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));
App.set("view engine", "ejs");

//einmal den Public Ordner bekannt machen, damit CSS statische Daten von dort geladen werden können.
App.use('/public', express.static('public'));

//normale Route
App.get("/", (req, res) => {
    let heute = new Date().toLocaleDateString();
    res.render("index", {datum: heute});
});

//Die Tabelle
App.get("/table", (req, res) =>{
    let heute = new Date().toLocaleDateString();
    models.cd.findAll({raw: true})
    .then( daten => {
        //console.log(daten);
        res.render('table', {cds: daten, datum: heute});
    });
});

//admin get
App.get("/admin", (req, res) => {
    let heute = new Date().toLocaleDateString();
    res.render("admin", {datum: heute});
});

//admin POST
App.post('/admin', (req, res) => {
   let uid = req.body.id;
   let utitle = req.body.title;
   let uartist = req.body.artist;
   let ucountry = req.body.country;
   let ucompany = req.body.company;
   let uprice = req.body.price;
   let uyear = req.body.year;

   //SQL Query: 
   const cd = models.cd.create({
    id: uid,
    title: utitle,
    artist: uartist,
    country: ucountry,
    company: ucompany,
    price: uprice,
    year: uyear
   });
   res.redirect('back');
   //console.log(uid, utitle, uartist, ucountry, ucompany, uprice, uyear);
});

//Starten:
App.listen(Port, Ip, () => console.log(`http://${Ip}:${Port}`));