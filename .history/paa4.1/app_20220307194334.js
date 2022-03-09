const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

//external css
app.use(express.static(path.join(__dirname, 'static')));
//

//mysql connect
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
//

//set views file
app.set('views',path.join(__dirname,'views'));
//	

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//

//get all teachers
app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM teachers";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'Management System',
            teachers : rows
        });
    });
});
//


//add page
app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'Add a Teacher'
    });
});
// add teacher
app.post('/save',(req, res) => { 
    let data = {teacher_id: req.body.teacher_id, teacher_lname: req.body.teacher_lname,
        teacher_fname: req.body.teacher_fname, teacher_mname: req.body.teacher_mname};
    let sql = "INSERT INTO teachers SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});



//server check
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
//