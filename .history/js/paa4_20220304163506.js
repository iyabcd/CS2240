

// functions
function disableTextbox() {  
    var a = document.querySelector('input[name="type"]:checked').value;
    console.log(a);
    if(a == 'create'){
        document.getElementById('teacher-id').disabled = true;
        document.getElementById('teacher-id').value = '';
    }else if (a == 'update'){
        document.getElementById('teacher-id').disabled = true;
    }else if (a == 'both'){
        document.getElementById('giftcheck').disabled = false;
        document.getElementById('cash').disabled = false;
        document.getElementById('card').disabled = false;
    }
}