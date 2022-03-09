
const mysql = require('mysql');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.get('/', (req,res) => {
    res.render('index');
});


// D:\Documents\GitHub\webdev\paa4 