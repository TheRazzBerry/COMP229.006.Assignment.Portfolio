//Razeen Rahman - 300877261 - 2023.10.07
//app.js

//Base Requirements
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

//Define Constants
const app = express();
const port = 3000;

//Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/docs', express.static(__dirname + 'public/docs'));

app.use(expressLayouts);
app.set('layout', 'layouts/default.ejs');
app.set('view engine', 'ejs');

//Difine Middleware
function logger(req, res, next) {
    console.log(req.method, req.url);
    next();
}

//Define Routes to Middleware
app.use(logger);

//Define Routes to Home
app.get('/', (req, res) => {res.render('index', {title: 'Home'})});
app.get('/home', (req, res) => {res.render('index', {title: 'Home'})});

//Define Routes to Pages
app.get('/about', (req, res) => {res.render('about', {title: 'About'})});
app.get('/projects', (req, res) => {res.render('projects', {title: 'Projects'})});
app.get('/services', (req, res) => {res.render('services', {title: 'Services'})});
app.get('/contact', (req, res) => {res.render('contact', {title: 'Contact'})});

//Start & Listen
app.listen(port, (error) => console.log('App is listening on port: ' + port));