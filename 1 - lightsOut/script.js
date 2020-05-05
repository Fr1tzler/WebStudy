function getMarginLeft(){
    document.getElementsByClassName("blockArray").style.marginLeft = window.innerWidth * 0.5 - window.innerHeight * 0.385;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function preprocess(){
    for (let x = 1; x <= 6; x++) {
        for (let y = 1; y <= 6; y++) {
            if (getRandomInt(2) == 1){
                document.getElementById(x * 10 + y).style.background = 'grey';
            }            
        }
    }
}

function click_on(id) {
    switch_color(id);
    switch_color(id + 1);
    switch_color(id + 10);
    switch_color(id - 1);
    switch_color(id - 10);
    if (check_win() == true) {
        alert("Congratulations!\nYou win!")
    }
}

function check(id) {
    return !(id % 10 < 1 || id % 10 >= 7 || id / 10 < 1 || id / 10 >= 7);
}

function switch_color(id) {
    if (check(id) == false) return;
    if (document.getElementById(id).style.background == 'grey'){
        document.getElementById(id).style.background = 'white';
    } else {
        document.getElementById(id).style.background = 'grey';
    }
}

function check_win(){
    for (let x = 1; x <= 6; x++) {
        for (let y = 1; y <= 6; y++) {
            if (document.getElementById(x * 10 + y).style.background != 'grey') {
                return false;
            }          
        }
    }
    return true;
}