"use strict";

let LKL = null;      //liczba klawiszy
let btns = [];       //tablica z klawiszami (referencje only)
let NROBR = null;    //numer wylosowanego obrazka
let pctName = "";    //nazwa wylosowanego obrazka
let pctArea = null;  //miejsce na planszy (div) na obrazek
let bDalej  = null;  //klawisz bDalej
let PODP = null;     //czy z Podpowiedzia

let wyrazy = ["bluzka", "chleb", "choinka", "cukierki", "czajnik", "czekolada", "dziewczynka", "długopis", "grzebień", "jabłko",
    "klocki", "kot", "kredki", "krzesło", "książka", "lampa", "miotła", "miś", "myszka", "młotek", "nożyczki", "nóż", "odkurzacz", "okno",
    "okulary", "ołówek", "pies", "pilot", "piłka", "poduszka", "pomidory", "ręcznik", "spodnie", "słodycze", "talerz", "widelec", "wieża",
    "zebra", "zegar", "łyżka"];

//wzorki:
//let sylaby = Array.from(document.querySelectorAll('.sylaba'));
//sylaby.forEach((value, i) => { value.innerHTML = '<p>' + PODP + '</p>' });


//-----------------------------------------------------//
window.onload = Inicjacja;//---------------------------//
//-----------------------------------------------------//


function Inicjacja() {
    pctArea = document.getElementById("pctArea"); //uchwyt do obrazka
    bDalej  = document.getElementById("bDalej");  //uchwyt do klawisza bDalej
    pobierzParametry();
    NROBR = ustawObrazek();
    utworzKlawisze();
    obdzielKlawisze(NROBR);
    wyswietlPodpowiedz();
    ukryjElement(bDalej);
}



function wyswietlPodpowiedz() {
    if (!PODP) return;
    document.getElementById("hintArea").innerHTML = "<p>" + pctName + "</p>";
}

function ustawObrazek() {
    //---------------------------    
    //Funckcja z efektem ubocznym ;):
    //1.Losuje i wyswietla obrazek
    //2.Zwraca numer wylosowanego obrazka    
    //---------------------------
    var numob = getRandomIntInclusive(0, wyrazy.length - 1);
    pctName = wyrazy[numob];
    pctArea.style.backgroundImage = "url(zasoby/" + pctName + ".jpg)";
    return numob;
}

function pobierzParametry() {
    //Uwaga - wartosci w LocalStorage sa zawsze typu string!!!

    LKL = parseInt(localStorage.liczbaKlawiszy);
    //mozna tez tak: LKL = localStorage.getItem('liczbaKlawiszy');
    if (localStorage.getItem('zPodpowiedzia') === "true")
        PODP = true
    else
        PODP = false;
}

function dajNextExercise() {
    likwidujKlawisze();
    NROBR = ustawObrazek();
    setTimeout(utworzKlawisze, 800);
    setTimeout(obdzielKlawisze, 900, NROBR);
    wyswietlPodpowiedz();
    ukryjElement(bDalej);
}

function utworzKlawisze() {
    //---------------------------------------------------------    
    //Tworzenie klawiszy i wstawianie ich do tablicy btns[]
    //---------------------------------------------------------    
    for (var i = 0; i < LKL; i++) {
        btns.push(dajJedenKlawisz()); // btns[i] = dajJedenKlawisz(); mozna tak...
    }
}

function obdzielKlawisze(pictMustBe) {
    //-------------------------------------------------------------- 
    //Obdzielenie klawiszy nazwami.   
    //Parametr oznacza Numer obrazka (juz) wylosowanego (=wyswietlanego).
    //Nazwa tego obrazka MUSi znalezc sie na jednym z klawiszy(!)
    //--------------------------------------------------------------    
    //Losowanie klawisza i przypisanie mu nazwy wylosowanego (=wyswietlanego) obrazka:
    var kl_wylos = getRandomIntInclusive(0, LKL - 1);
    var wyr_wysw = wyrazy[pictMustBe]; //wyraz wylosowany (=wyswietlany)
    btns[kl_wylos].innerHTML = "<p>" + wyr_wysw + "</p>";
    btns[kl_wylos].style.color = "maroon";
    //Wszystkie inne klawisze, (za wykatkiem wylosowanego i obsluzonego powyzej), dostaja losowe nazwy:
    btns.forEach((elem, i) => { if (i !== kl_wylos) { elem.innerHTML = "<p>" + dajWyrazRandom(wyr_wysw) + "</p>" }; });
}

function dajWyrazRandom(notAllowed) {
    //----------------------------------------------
    //Daje losowy wyraz; Parametr oznacza wyraz, ktory nie powinien
    //zostac wylosowany (bo de facto juz jest na jednym z klawiszy)
    //----------------------------------------------
    var len = wyrazy.length;
    var i = 0;
    do {
        var idx = getRandomIntInclusive(0, len - 1);
        //'trick' - zabezpieczenie przed zapetleniem przy malych liczbach wyrazow/obrazkow = wyrazy[];
        //mozliwe jest jednak uzyskanie takiego samego wyrazu...(im wieksza liczba w warunku, tym pniejsze p-stwo)
        i++;
        if (i>10) break; 
    } while (wyrazy[idx] === notAllowed);
    return wyrazy[idx];
}

function dajJedenKlawisz() {
    //-------------------------------------------------
    //Zwraca (przez return) jeden (1szt.) "gotowy" klawisz (referencje):
    //1.Umieszcza go Fizycznie na planszy (=tworzy w DOM)
    //2.Ustawia w nim listenera na onclick
    //Klawisz jest gotowy do wstawienia do bts[] (ww funkcja tego nie robi!!)
    //-------------------------------------------------
    var elem = document.createElement("DIV");
    elem.classList.add("klawisz");
    document.getElementById("btnsArea").appendChild(elem);
    elem.onclick = handleKlikOnKlawisz;
    return elem;
}

function likwidujKlawisze() {
    //----------------------------------------------------------------------
    //Usuniecie klawiszy z DOM (=z ekranu) i wyczyszczenie tablicy btns[]
    //----------------------------------------------------------------------    
    //[...btns].forEach(elem => {elem.style.backgroundColor="red"; elem.innerHTML="<p>krowa</p>"}); to dziala!
    [...btns].forEach(elem => elem.parentNode.removeChild(elem));
    btns.length = 0; //czyszczenie tablicy
}

function handleKlikOnKlawisz(event) {
    var tekst = event.target.innerText;
    if (tekst===pctName) {
        // alert("TRAFILES!!!");
        pokazElement(bDalej);
    }
}

function ukryjElement(elem){
    elem.style.display = "none";
}

function pokazElement(elem){
//najprostsza forma, nie sprawdzam jaki byl przedtem, nieelegancko...    
    elem.style.display = "block"; 
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






