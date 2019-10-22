"use strict";

let LKL  = null;
let PODP = false;
let sylaby = Array.from(document.querySelectorAll('.sylaba'));



window.onload = pobierzParametry;



function pobierzParametry() {
/* Wyswietlenie sylab na kwadratach; dodanie handlera na kwadraty */    


// alert(PODP);

    LKL  = localStorage.getItem('liczbaKlawiszy');
    PODP = localStorage.getItem('zPodpowiedzia');

    // sylaby.forEach( function(value,i) {value.innerHTML=i} ); - wzorzec dla parametrow
    sylaby.forEach((value, i) => { value.innerHTML = '<p>' + PODP + '</p>' });

}



