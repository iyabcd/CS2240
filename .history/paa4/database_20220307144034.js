
const mysql = require('mysql');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.render('index');
});

// D:\Documents\GitHub\webdev\paa4 