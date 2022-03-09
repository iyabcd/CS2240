
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database: 'teacherDB'
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Database connected.');
    }else{
        console.log('Database not connected. \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});

app.listen(3000,()=>console.log('Express server running at port: 3000'));
app.get('/teachers', (res,req)=>{
    mysqlConnection.query('SELECT * FROM teachers', (err,rows,fields)=>{
        if(!err){
            console.log(rows[0].teacher_id);
        }else{
            console.log(err);
        }
    });
});

// D:\Documents\GitHub\webdev\paa4