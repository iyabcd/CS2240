
const mysql = require('mysql');
const express = require('express');
const app = express();
const expbs = require('express-handlebars');

app.engine('handlebars', expbs());
app.set('view engine', 'handlebars');

// D:\Documents\GitHub\webdev\paa4 