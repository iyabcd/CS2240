
const mysql = require('mysql');
const express = require('express');
const app = express();
const expbs = require('express-handlebars');

app.engine('handlebars', expbs());

// D:\Documents\GitHub\webdev\paa4 