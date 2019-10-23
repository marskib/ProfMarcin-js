"use strict";

let LKL = null;     //liczba klawiszy
let btns = [];      //tablica z klawiszami
let NROBR = null;   //numer wylosowanego obrazka
let pctName = "";   //nazwa wylosowanego obrazka
let pctArea = null; //miejsce na planszy (div) na obrazek
let PODP = null;   //czy z Podpowiedzia

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
    pobierzParametry();
    ustawObrazek();
    utworzKlawisze();
    obdzielKlawisze();
    wyswietlPodpowiedz();
}

function wyswietlPodpowiedz() {
    if (!PODP) return;
    document.getElementById("hintArea").innerHTML = "<p>" + pctName + "</p>";
}

function ustawObrazek() {
    NROBR = getRandomIntInclusive(0, wyrazy.length - 1);
    pctName = wyrazy[NROBR];
    pctArea.style.backgroundImage = "url(zasoby/" + pctName + ".jpg)";
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
    ustawObrazek();
    setTimeout(utworzKlawisze, 800);
    setTimeout(obdzielKlawisze, 1000);
    wyswietlPodpowiedz();
}

function utworzKlawisze() {
    //---------------------------------------------------------    
    //Tworzenie klawiszy i wstawianie ich do tablicy btns[]
    //---------------------------------------------------------    
    for (var i = 0; i < LKL; i++) {
        btns[i] = dajJedenKlawisz();
    }
}

function obdzielKlawisze() {
    btns.forEach(elem => elem.innerHTML = "<p>" + dajWyraz() + "</p>");
}

function dajWyraz() {
    var len = wyrazy.length;
    var idx = getRandomIntInclusive(0, len - 1);
    return wyrazy[idx];
}

function dajJedenKlawisz() {
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

function likwidujKlawisze() {
    //----------------------------------------------------------------------
    //Usuniecie klawiszy z DOM (=z ekranu) i wyczyszczenie tablicy btns[]
    //----------------------------------------------------------------------    
    //[...btns].forEach(elem => {elem.style.backgroundColor="red"; elem.innerHTML="<p>krowa</p>"}); to dziala!
    [...btns].forEach(elem => elem.parentNode.removeChild(elem));
    btns.length = 0; //czyszczenie tablicy
}

function handleKlikOnKlawisz() {
    alert("klikniecie klawisza z btnsArea");
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






