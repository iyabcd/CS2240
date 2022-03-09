const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

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

//set views file
app.set('views',path.join(__dirname,'views'));
//	

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//

//show all teachers
app.get('/',(req, res) => {
    let sql = "SELECT * FROM teachers";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('teacher_index', {
            title : 'Teacher Management System',
            teachers : rows
        });
    });
});
//add teacher
app.get('/add',(req, res) => {
    res.render('teacher_add', {
        title : 'Add a Teacher'
    });
});
app.post('/save',(req, res) => { 
    let data = {teacher_id: req.body.teacher_id, teacher_lname: req.body.teacher_lname,
        teacher_fname: req.body.teacher_fname, teacher_mname: req.body.teacher_mname};
    let sql = "INSERT INTO teachers SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
//update teacher
app.get('/edit/:teacher_id',(req, res) => {
    const teacher_id = req.params.teacher_id;
    let sql = `SELECT * FROM teachers WHERE teacher_id = ${teacher_id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('teacher_update', {
            title : 'Update a Teacher',
            teacher : result[0]
        });
    });
});
app.post('/update',(req, res) => {
    const teacher_id = req.body.teacher_id;
    let sql = "UPDATE TEACHERS SET teacher_lname='"+req.body.teacher_lname+"',  teacher_fname='"+req.body.teacher_fname+"',  teacher_mname='"+req.body.teacher_mname+"' WHERE teacher_id ="+ teacher_id;
    connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
      $('')
    });
});
//delete teacher
app.get('/delete/:teacher_id',(req, res) => {
    const teacher_id = req.params.teacher_id;
    let sql = `DELETE FROM teachers WHERE teacher_id = ${teacher_id}`;
    connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//server check
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
//
