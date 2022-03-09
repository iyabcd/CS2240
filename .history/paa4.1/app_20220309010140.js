const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request } = require('http');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

//external css
app.use('/assets', express.static('assets'));

//mysql connect
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'paa4DB'
});
connection.connect(function(err){
    if(!!err) console.log(err);
    else console.log('Database Connected!');
}); 
//

//show all teachers
app.get('/',(req, res) => {
    let sql = "SELECT * FROM teachers";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('teacher_index', {
            title : 'Teacher Management System',
            teachers : rows,
            message : req.flash('message')
        });
    });
});
//add teacher
app.post('/teachers/save',(req, res) => { 
    let data = {teacher_id: req.body.teacher_id, teacher_lname: req.body.teacher_lname,
        teacher_fname: req.body.teacher_fname, teacher_mname: req.body.teacher_mname};
    let sql = "INSERT INTO teachers SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
//update teacher
app.post('/teachers/update',(req, res) => {
    const teacher_id = req.body.teacher_id;
    let sql = "UPDATE TEACHERS SET teacher_lname='"+req.body.teacher_lname+"',  teacher_fname='"+req.body.teacher_fname+"',  teacher_mname='"+req.body.teacher_mname+"' WHERE teacher_id ="+ teacher_id;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
//delete teacher
app.get('/teachers/delete/:teacher_id',(req, res) => {
    const teacher_id = req.params.teacher_id;
    let sql = `DELETE FROM teachers WHERE teacher_id = ${teacher_id}`;
    let query = connection.query(sql,(err, results) => {
        if(err) throw err;
        req.flash('message', + teacher_id +' successfully deleted!');
        res.redirect('/');
    });
});
//search teacher
app.get('/teachers/search/', (req, res) => {
    const { term } = req.query;
    console.log(term);
    let sql = `SELECT * FROM teachers WHERE teacher_lname LIKE '${term}' OR teacher_id LIKE ${term}`;
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        if(rows.length < 1){
            req.flash('message', rows.length + ' result/s for ' + term);
            res.redirect("/");
        }else {
            req.flash('message', rows.length + ' result/s for ' + term);
            res.render('teacher_index', {
                title : 'Teacher Management System',
                teachers : rows,
                message : req.flash('message')
            });
        }
    });
});
    

//server check
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
//
