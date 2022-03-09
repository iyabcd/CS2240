
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

