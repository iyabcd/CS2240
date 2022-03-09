
// const mysql = require('mysql');
// const express = require('express');
// const app = express();
// const exphbs = require('express-handlebars');

// app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
// app.set('view engine', 'handlebars');
// app.get('/', (req,res) => {
//     res.render('index');
// });

const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({defaultLayout: 'index', extname: '.handlebars', layoutsDir: __dirname + './paa4/views'}));
app.set('view engine', 'handlebars');
// app.set("views", "/views");

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000);

// D:\Documents\GitHub\webdev\paa4 