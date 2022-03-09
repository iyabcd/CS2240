
const mysql = require('mysql');
const express = require('express');
var app = express();
const expbs = require('express-handlebars');
const bodyparser = require('body-parser');

app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');
// app.use(bodyparser.json());

app.get('/', (req,res) => {

});

// D:\Documents\GitHub\webdev\paa4 