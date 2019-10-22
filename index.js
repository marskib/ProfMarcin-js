"use strict";

function przejmijParametry() {
    /*Przekazania parametrow za pomocą localStorage na inną 'formę'/'activity'*/


    var LKL = dajWartoscRadio("klawisze");

    var PODP  = document.getElementById("cbPodp").checked;


    localStorage.setItem('liczbaKlawiszy',LKL);
    localStorage.setItem('zPodpowiedzia', PODP);
}


function dajWartoscRadio(RGrupa) {
   var radios = document.getElementsByName(RGrupa);
    console.log("radios: ",radios);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
            break;
        }
    }
}