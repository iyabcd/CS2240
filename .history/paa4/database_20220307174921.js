
const mysql = require('mysql');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//index page
app.get('/', (req,res) => {
    res.render('index', {title: 'Landing Page'});
});
//crud page
app.get('/crud', (req,res) => {
    res.render('crud', {title: 'CRUD Page'});
});

app.listen(3000,()=>{
    console.log('Express server running at port: 3000')
});

//mysql
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database: 'paa4DB',
    multipleStatements: true
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Database connected.');
    }else{
        console.log('Database not connected. \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});

//get all teachers
app.get('/teachers', (req,res)=>{
    mysqlConnection.query('SELECT * FROM teachers', (err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//get a teacher
app.get('/teachers/:id', (req,res)=>{
    mysqlConnection.query('SELECT * FROM teachers WHERE teacher_id = ?',[req.params.id], (err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//delete a teacher
app.delete('/teachers/:id', (req,res)=>{
    mysqlConnection.query('DELETE FROM teachers WHERE teacher_id = ?',[req.params.id], (err,rows,fields)=>{
        if(!err){
            res.send('Teacher is deleted.');
        }else{
            console.log(err);
        }
    });
});

//add a teacher
app.post('/teachers', (req,res)=>{
    let t = req.body;
    var sql = "SET @teacher_id = ?;SET @teacher_lname = ?;SET @teacher_fname = ?;SET @teacher_mname = ?;\
    CALL TeacherAddOrEdit(@teacher_id,@teacher_lname,@teacher_fname,@teacher_mname);";
    mysqlConnection.query(sql,[t.teacher_id,t.teacher_lname,t.teacher_fname,t.teacher_mname], (err,rows,fields)=>{
        if(!err){
            rows.forEach(element => {
                if(element.constructor == Array){
                    res.send('Inserted teacher id:' + element[0].teacher_id);
                }
            });
        }else{
            console.log(err);
        }
    });
});

//update a teacher
app.put('/teachers', (req,res)=>{
    let t = req.body;
    var sql = "SET @teacher_id = ?;SET @teacher_lname = ?;SET @teacher_fname = ?;SET @teacher_mname = ?;\
    CALL TeacherAddOrEdit(@teacher_id,@teacher_lname,@teacher_fname,@teacher_mname);";
    mysqlConnection.query(sql,[t.teacher_id,t.teacher_lname,t.teacher_fname,t.teacher_mname], (err,rows,fields)=>{
        if(!err){
            res.send('Updated!');
        }else{
            console.log(err);
        }
    });
});


// D:\Documents\GitHub\webdev\paa4 