

// functions
function disableTextbox() {  
    var a = document.querySelector('input[name="type"]:checked').value;
    console.log(a);
    if(a == 'create'){
        document.getElementById('teacher-id').disabled = true;
        document.getElementById('teacher-id').value = '';
        document.getElementById('teacher-fname').disabled = false;
        document.getElementById('teacher-lname').disabled = false;
        document.getElementById('teacher-mname').disabled = false;
    }else if (a == 'update'){
        document.getElementById('teacher-id').disabled = false;
        document.getElementById('teacher-fname').disabled = false;
        document.getElementById('teacher-lname').disabled = false;
        document.getElementById('teacher-mname').disabled = false;
    }else if (a == 'both'){
        document.getElementById('giftcheck').disabled = false;
        document.getElementById('cash').disabled = false;
        document.getElementById('card').disabled = false;
    }
}