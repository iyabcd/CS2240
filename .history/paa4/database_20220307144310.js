
const mysql = require('mysql');
const express = require('express');
const app = express();
const expbs = require('express-handlebars');

app.engine('handlebars',expbs({
    defaultLayout: null,
  }));
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.render('index');
});

// D:\Documents\GitHub\webdev\paa4 