
const mysql = require('mysql');
const express = require('express');
const app = express();
const expbs = require('express-handlebars');

app. engine('hbs', expbs ({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.render('index',{ layout: false });
});

// D:\Documents\GitHub\webdev\paa4 