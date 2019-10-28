"use strict";

let LKL = null; //liczba klawiszy
let btns = []; //tablica z klawiszami (referencje only)
let NROBR = null; //numer wylosowanego obrazka
let pctName = ""; //nazwa wylosowanego obrazka
let pctArea = null; //miejsce na planszy (div) na obrazek
let hintArea = null; //obszar na podpowiedz i/lub duzą nazwę obrazka (po Zwyciestwie)
//inicjalne wartosci obszaru podpowiedzi/duzej nazwy obrazka:
let hAColorInit = "";
let hAFSizeInit = "";
//Stala wartosc box-shadow dla klawisza bDalej:
const bDalejBS = "4px 4px darkgreen";
//
let bDalej = null; //klawisz bDalej
let PODP = null; //czy z Podpowiedzia
const PCT_DELAY = 1000; //opoznienie w pokazywaniu obrazka

let wyrazy = ["bluzka", "chleb", "choinka", "cukierki", "czajnik", "czekolada", "dziewczynka", "długopis", "grzebień", "jabłko",
    "klocki", "kot", "kredki", "krzesło", "książka", "lampa", "miotła", "miś", "myszka", "młotek", "nożyczki", "nóż", "odkurzacz", "okno",
    "okulary", "ołówek", "pies", "pilot", "piłka", "poduszka", "pomidory", "ręcznik", "spodnie", "słodycze", "talerz", "widelec", "wieża",
    "zebra", "zegar", "łyżka"
];

//wzorki:
//let sylaby = Array.from(document.querySelectorAll('.sylaba'));
//sylaby.forEach((value, i) => { value.innerHTML = '<p>' + PODP + '</p>' });


//-----------------------------------------------------//
window.onload = Inicjacja; //---------------------------//
//-----------------------------------------------------//


function Inicjacja() {
    pctArea = document.getElementById("pctArea"); //uchwyt do obrazka
    bDalej = document.getElementById("bDalej"); //uchwyt do klawisza bDalej
    hintArea = document.getElementById("hintArea"); //uchwyt do hintArea
    //inicjalne wartosci obszaru podpowiedzi/duzej nazwy:
    var robStyle = getComputedStyle(hintArea);
    hAColorInit = robStyle.color;
    hAFSizeInit = robStyle.fontSize;
    //
    pobierzParametry();
    NROBR = ustawObrazek();
    utworzKlawisze();
    obdzielKlawisze(NROBR);
    wyswietlPodpowiedz();
}

function wyswietlPodpowiedz() {
    if (!PODP) return;
    setTimeout(() => (hintArea.innerHTML = "<p>" + pctName + "</p>"), 3 * PCT_DELAY);
}

function czyscPodObrazkiem() {
    //-------------------------------------------------
    //Czysci wszystko pod obrazkiem, czyli
    //duzy napis i podpowiedz (if any).
    //-------------------------------------------------
    //Czyszczenie starej podpowiedzi (if any) i/lub duzego napisu:
    hintArea.innerHTML = "<p></p>";
    //Przywrocenie wlasciwosci pod kolejna podpowiedz (if any):
    hintArea.style.color = hAColorInit;
    hintArea.style.fontSize = hAFSizeInit;
}

function ustawObrazek() {
    //---------------------------    
    //Funckcja z efektem ubocznym ;) :
    //0.Czysci stary obrazek (efekciarstwo)
    //1.Losuje i wyswietla obrazek
    //2.Zwraca numer wylosowanego obrazka (efekt uboczny, b.wazny!!!)   
    //---------------------------
    //czyszczenie starego (dla efektu)
    pctArea.style.backgroundImage = "url(zasoby/tlo.jpg)";
    //losowanie obrazka:
    var numob = getRandomIntInclusive(0, wyrazy.length - 1);
    pctName = wyrazy[numob];
    //Pokazanie po lekkim opoznieniu (efekciarstwo):
    setTimeout(() => (pctArea.style.backgroundImage = "url(zasoby/" + pctName + ".jpg)"), PCT_DELAY);
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
    czyscPodObrazkiem();
    NROBR = ustawObrazek();
    setTimeout(utworzKlawisze, 2 * PCT_DELAY);
    setTimeout(obdzielKlawisze, 2.1 * PCT_DELAY, NROBR); //MUSI(!) byc nieco pozniej
    wyswietlPodpowiedz();
    ukryjbDalej();
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
    //Wszystkie inne klawisze, (za wykatkiem wylosowanego i obsluzonego powyzej), dostaja losowe nazwy:
    btns.forEach((elem, i) => {
        if (i !== kl_wylos) {
            elem.innerHTML = "<p>" + dajWyrazRandom(wyr_wysw) + "</p>"
        };
    });
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
        if (i > 10) break;
    } while (wyrazy[idx] === notAllowed);
    return wyrazy[idx];
}

function dajJedenKlawisz() {
    //-------------------------------------------------
    //Zwraca (przez return) jeden (1szt.) "gotowy" klawisz (referencję):
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
    if (tekst === pctName) {
        Zwyciestwo();
    }
}

function Zwyciestwo() {
    //---------------------------------------
    //Czynnosci po poprawnym odgadnieciu klawisza
    //---------------------------------------
    wygasBlokujKlawisze();
    pokazNapis();
    pokazbDalej(300);
}

function wygasBlokujKlawisze() {
    //--------------------------------------------------------------------    
    //Efekt "dydaktyczny" :
    //1.Zdejmuje onclick
    //2.pomniejsza i wyszarza niewlasciwe napisy; 'zdejmuje' kursor
    //3.wlasciwy napis(y) pozostawia
    //--------------------------------------------------------------------    

    for (var i = 0; i < LKL; i++) {
        btns[i].onclick = null;
        btns[i].style.cursor = "auto";
        var napis = btns[i].innerText;
        if (napis !== pctName) {
            btns[i].style.color = "#646464"; //wyszarzenie
            btns[i].style.fontSize = "10px";
            btns[i].style.fontWeight = "normal";
            btns[i].style.letterSpacing = "-1px"; //dobry efekt na mobilnych
        }
    }
}



function pokazNapis() {
    //--------------------------------
    //Pod obrazkiem, w miejscu podpowiedzi (if any), pokazuje sie duzy napis.
    //--------------------------------
    hintArea.innerHTML = "<p>" + pctName + "</p>";
    hintArea.style.color = "maroon";
    var fsString = hAFSizeInit.substr(0, 2);

    if (pctName.length > 7)
        hintArea.style.fontSize = 1.5 * fsString + "px";
    else
        hintArea.style.fontSize = 2.0 * fsString + "px";
}

function ukryjbDalej() {
    bDalej.onclick = null;
    bDalej.style.cursor = "auto";
    bDalej.style.backgroundColor = "transparent";
    bDalej.style.color = "transparent";

    bDalej.style.boxShadow = "none";

}

function pokazbDalej(delay) {
    setTimeout(() => {
        bDalej.onclick = dajNextExercise;
        bDalej.style.cursor = "pointer";
        bDalej.style.backgroundColor = "green";
        bDalej.style.color = "black";

        bDalej.style.boxShadow = bDalejBS;

    }, delay);
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}