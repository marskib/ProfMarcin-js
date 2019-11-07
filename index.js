"use strict";

function przejmijParametry() {
    //--------------------------------------------------------------------
    //Przejecie parametrow do localStorage w celu przekazania na inną 'formę'/'activity
    //--------------------------------------------------------------------

    var LKL    = dajWartoscRadio("klawisze");
    var PODP   = document.getElementById("cbPodp").checked;
    var PCT    = document.getElementById("cbPct").checked;
    var LEKT   = document.getElementById("cbLekt").checked;
    var EFEKTY = document.getElementById("cbEfekt").checked;
    var NAGRODA= document.getElementById("cbNagr").checked;

    localStorage.setItem('liczbaKlawiszy',LKL);
    localStorage.setItem('zPodpowiedzia', PODP);
    localStorage.setItem('zLektorem', LEKT);
    localStorage.setItem('zObrazkami', PCT);
    localStorage.setItem('zEfektami', EFEKTY);
    localStorage.setItem('zNagroda',  NAGRODA);
}


function dajWartoscRadio(RGrupa) {
   var radios = document.getElementsByName(RGrupa);
    // console.log("radios: ",radios);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
            break;
        }
    }
}