//mysql
var mysql = 'mysql';
require([mysql], function('mysql'){
    // do something with fooModule
})
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