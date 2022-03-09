$(function() {
    minimalTabs();
});

// functions
function disableTextbox() {  
    var a = document.querySelector('input[name="type"]:checked').value;
    console.log(a);
    if(a == 'create'){
        document.getElementById('teacher-id').disabled = true;
        document.getElementById('teacher-id').value = '';
        document.getElementById('btn-check').disabled = true;
        document.getElementById('teacher-fname').disabled = false;
        document.getElementById('teacher-lname').disabled = false;
        document.getElementById('teacher-mname').disabled = false;
    }else if (a == 'update'){
        document.getElementById('teacher-id').disabled = false;
        document.getElementById('btn-check').disabled = false;
        document.getElementById('teacher-fname').disabled = true;
        document.getElementById('teacher-lname').disabled = true;
        document.getElementById('teacher-mname').disabled = true;
        document.getElementById('teacher-fname').value = '';
        document.getElementById('teacher-lname').value = '';
        document.getElementById('teacher-mname').value = '';
    }else if (a == 'delete'){
        document.getElementById('giftcheck').disabled = false;
        document.getElementById('cash').disabled = false;
        document.getElementById('card').disabled = false;
    }
}
function minimalTabs() {
    $(".minimalTabs").tabs({ 
        show: { effect: "slide", direction: "left", duration: 200, easing: "easeOutBack" } ,
        hide: { effect: "slide", direction: "right", duration: 200, easing: "easeInQuad" } 
      });
}

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

app.listen(3000,()=>console.log('Express server running at port: 3000'));

//get all teachers
app.get('/teachers', (req,res)=>{
    mysqlConnection.query('SELECT * FROM teachers', (err,rows,fields)=>{
        if(!err){
            res.render('index');
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