$('h2').text("HEllo");


//mysql
const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Jasp1818jasp',
    database: 'teacherDB'
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Database connected.');
    }else{
        console.log('Database not connected. \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});