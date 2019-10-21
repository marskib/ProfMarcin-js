"use strict";

let LKL = null;
let sylaby = Array.from(document.querySelectorAll('.sylaba'));



window.onload = ladujZestaw;



function ladujZestaw() {
/* Wyswietlenie sylab na kwadratach; dodanie handlera na kwadraty */    

    LKL = localStorage.getItem('liczbaKlawiszy');
    alert(LKL);

    // sylaby.forEach( function(value,i) {value.innerHTML=i} ); - wzorzec dla parametrow
    sylaby.forEach((value, i) => { value.innerHTML = '<p>' + LKL + '</p>' });

}



