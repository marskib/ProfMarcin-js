"use strict";

function przejmijLiczbeKlawiszy() {
    var LKL = dajWartoscRadio("klawisze");
    //Przekazania parametru za pomocą localStorage na inną 'formę'/'activity':
    localStorage.setItem('liczbaKlawiszy',LKL);
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