

// functions
function disableTextbox() {  
    var a = document.querySelector('input[name="type"]:checked').value;
    console.log(a);
    console.log(document.getElementById("teacher-id").value);
    if(a == 'create'){
        document.getElementById('teacher-id').disabled = false;
        document.getElementById('cash').disabled = false;
        document.getElementById('card').disabled = false;
    }else if (a == 'update'){
        document.getElementById('giftcheck').disabled = false;
        document.getElementById('cash').disabled = true;
        document.getElementById('card').disabled = false;
        document.getElementById('giftcheck').value = document.getElementById('giftcheck').value;
        document.getElementById('cash').value = '';
        document.getElementById('card').value =  document.getElementById('card').value;
        cash = 0;
    }else if (a == 'both'){
        document.getElementById('giftcheck').disabled = false;
        document.getElementById('cash').disabled = false;
        document.getElementById('card').disabled = false;
    }
}