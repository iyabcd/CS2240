const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'paa4DB'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM teachers";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            teachers : rows
        });
    });
});

//add page
app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});
//add teacher
app.post('/save',(req, res) => { 
    let data = {name: req.body.name, email: req.body.email, phone_no: req.body.phone_no};
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});



// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});