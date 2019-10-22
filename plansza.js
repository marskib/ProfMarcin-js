"use strict";

let LKL  = null;
let PODP = false;
let sylaby = Array.from(document.querySelectorAll('.sylaba'));

let btn = [];


window.onload = pobierzParametry;



function pobierzParametry() {
    LKL  = localStorage.getItem('liczbaKlawiszy');
    PODP = localStorage.getItem('zPodpowiedzia');

    //sylaby.forEach((value, i) => { value.innerHTML = '<p>' + PODP + '</p>' });

    for (var i=0; i<LKL; i++) {
        btn[i] = utworzKlawisz();
    }
    
}

function utworzKlawisz(){
    var elem = document.createElement("DIV");
    elem.classList.add("klawisz");
    document.getElementById("btnsArea").appendChild(elem);
    return elem;
}





