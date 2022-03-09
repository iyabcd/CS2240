
const mysql = require('mysql');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.render('landing');
});

app.get('/crud', (req,res) => {
    res.render('crud');
});

app.listen(3000,()=>{
    console.log('Express server running at port: 3000')
});

// D:\Documents\GitHub\webdev\paa4 