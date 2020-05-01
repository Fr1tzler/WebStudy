function click_on(id) {
    switch_color(id);
    switch_color(String(id + 1));
    switch_color(String(id - 1));
    switch_color(String(id - 10));
    switch_color(String(id + 10));
    
}

function switch_color(id) {
    if(document.getElementById(id).style.background == 'grey'){
        document.getElementById(id).style.background = 'white';
    } else {
        document.getElementById(id).style.background = 'grey';
    }
}