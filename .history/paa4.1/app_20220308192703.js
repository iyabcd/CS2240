const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { request } = require('http');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
            teachers : rows
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
    let sql = `DELETE FROM teachers where teacher_id = ${teacher_id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});
//search teacher
// Assign route
app.get('teachers/search', (req, res, next) => {
    connection.query('SELECT * FROM teachers WHERE teacher_id LIKE "%' + req.query.term + '%"',
    function(err, rows, fields){
      if(err) throw err;
      var data = [];
      for(i=0;i<rows.length;i++){
        data.push(rows[i].product);
      }
      res.end(JSON.stringify(data));
      console.log(JSON.stringify(data));
    });
  });
    

//server check
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
//
