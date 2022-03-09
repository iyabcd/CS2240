// D:\Documents\GitHub\webdev\paa4.1

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();


// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});

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