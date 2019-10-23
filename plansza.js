"use strict";

let LKL  = null;  //liczba klawiszy
let btns = [];    //tablica z klawiszami
let PODP = false; //czy z Podpowiedzia

//wzorki:
//let sylaby = Array.from(document.querySelectorAll('.sylaba'));
//sylaby.forEach((value, i) => { value.innerHTML = '<p>' + PODP + '</p>' });


//-----------------------------------------------------//
window.onload = Inicjacja;//---------------------------//
//-----------------------------------------------------//


function Inicjacja(){
    pobierzParametry();
    utworzKlawisze();
}


function pobierzParametry() {
    LKL  = localStorage.getItem('liczbaKlawiszy');
    PODP = localStorage.getItem('zPodpowiedzia');
}


function dajNextExercise(){
    likwidujKlawisze();
    setTimeout(utworzKlawisze, 800);
}

function utworzKlawisze() {
//---------------------------------------------------------    
//Tworzenie klawiszy i wstawianie ich do tablicy btns[]
//---------------------------------------------------------    
    for (var i=0; i<LKL; i++) {
        btns[i] = dajJedenKlawisz();
    }
}

function dajJedenKlawisz(){
//-------------------------------------------------
//Zwraca (przez return) jeden (1szt.) "gotowy" klawisz:
//1.Umieszcza go fizycznie na planszy (=tworzy w DOM)
//2.Ustawia w nim listenera na onclick
//Klawisz jest gotowy do wstawienia do bts[] (ww funkcja tego nie robi!!)
//-------------------------------------------------
    var elem = document.createElement("DIV");
    elem.classList.add("klawisz");
    document.getElementById("btnsArea").appendChild(elem);
    elem.onclick = handleKlikOnKlawisz;
    return elem;
}

function likwidujKlawisze(){
//----------------------------------------------------------------------
//Usuniecie klawiszy z DOM (=z ekranu) i wyczyszczenie tablicy btns[]
//----------------------------------------------------------------------    
    //[...btns].forEach(elem => {elem.style.backgroundColor="red"; elem.innerHTML="<p>krowa</p>"}); to dziala!
    [...btns].forEach(elem => elem.parentNode.removeChild(elem));
    btns.length = 0; //czyszczenie tablicy
}

function handleKlikOnKlawisz(){
    alert("klikniecie klawisza z btnsArea");
}






