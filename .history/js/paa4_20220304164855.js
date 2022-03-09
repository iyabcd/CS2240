

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