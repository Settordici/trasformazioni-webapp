function calcola() {
    aone = document.getElementById("id_xone").value;
    atwo = document.getElementById("id_xtwo").value;
    bone = document.getElementById("id_yone").value;
    btwo = document.getElementById("id_ytwo").value;
    cone = document.getElementById("id_cone").value;
    ctwo = document.getElementById("id_ctwo").value;

    aone = numfix(aone);
    atwo = numfix(atwo);
    bone = numfix(bone);
    btwo = numfix(btwo);
    cone = numfix(cone);
    ctwo = numfix(ctwo);

    det = determinante(aone, atwo, bone, btwo);

    if (det == 0) {
        document.getElementById("answertext").innerHTML = "La trasformazione non è un'affinità";
    }

    else {
        if (det != 1 && det != -1) {
            if (aone*aone + atwo*atwo == bone*bone + btwo*btwo && aone*bone + atwo*btwo == 0) {
                if (bone == 0 && atwo == 0 && aone == btwo) {
                    document.getElementById("answertext").innerHTML = "Determinante: " + det 
                + "<br>La trasformazione è una OMOTETIA"
                + "<br>di centro: C" + puntiuniti(aone, atwo, bone, btwo, cone, ctwo);
                }
                else {
                document.getElementById("answertext").innerHTML = "Determinante: " + det 
                + "<br>La trasformazione è una SIMILITUDINE " + direttaindiretta(det)
                + "<br>Punti uniti: " + puntiuniti(aone, atwo, bone, btwo, cone, ctwo);
                }
            }
            else {
                document.getElementById("answertext").innerHTML = "Determinante: " + det 
                + "<br>La trasformazione è una AFFINITA' GENERICA " + direttaindiretta(det) 
                + "<br>Punti uniti: " + puntiuniti(aone, atwo, bone, btwo, cone, ctwo);
            }
        }

        else if (det == 1 || det == -1) {
            if (aone*aone + atwo*atwo == 1 && bone*bone + btwo*btwo == 1 && aone*bone + atwo*btwo == 0) {
                if (det > 0) {
                    if (puntiuniti(aone, atwo, bone, btwo, cone, ctwo) == "Nessuno") {
                        document.getElementById("answertext").innerHTML = "Determinante: " + det 
                        + "<br>La trasformazione è una ISOMETRIA DIRETTA, più precisamente"
                        + " una TRASLAZIONE"
                        + "<br>di vettore: v(" + cone + "; " + ctwo + ")";
                    }
                    else {
                        document.getElementById("answertext").innerHTML = "Determinante: " + det 
                        + "<br>La trasformazione è una ISOMETRIA DIRETTA, più precisamente"
                        + " una ROTAZIONE oppure una SIMMETRIA CENTRALE"
                        + "<br>di centro: C" + puntiuniti(aone, atwo, bone, btwo, cone, ctwo);
                    }
                }
                else {
                    if (puntiuniti(aone, atwo, bone, btwo, cone, ctwo) == "Nessuno") {
                        document.getElementById("answertext").innerHTML = "Determinante: " + det 
                        + "<br>La trasformazione è una ISOMETRIA INDIRETTA, più precisamente"
                        + " una GLISSOSIMMETRIA"
                        + "<br>che non ha punti uniti";
                    }
                    else {
                        document.getElementById("answertext").innerHTML = "Determinante: " + det 
                        + "<br>La trasformazione è una ISOMETRIA INDIRETTA, più precisamente"
                        + " una SIMMETRIA ASSIALE"
                        + "<br>con retta(sperimentale):" + puntiuniti(aone, atwo, bone, btwo, cone, ctwo);
                    }

                }
            }
            else {
                document.getElementById("answertext").innerHTML = "Determinante: " + det 
                + "<br>La trasformazione è una EQUIVALENZA " + direttaindiretta(det)
                + "<br>Punti uniti: " + puntiuniti(aone, atwo, bone, btwo, cone, ctwo);
            }
        }
        else {
            document.getElementById("answertext").innerHTML = "Determinante: " + det;
        }
    }
    
}

function determinante(aone, atwo, bone, btwo) {
    var det = aone * btwo - atwo * bone;
    if (isNaN(det)) {
        return "<b<u>Input non valido</u></b>";
    } 
    else {
        return fraction(det);
        
    }
}

function fraction(num) {
    if (math.fraction(num).d == 1) {
        return Math.round(num);
    }
    if (num < 0) {
        num = math.fraction(num);
        return "-" + num.n + "/" + num.d;
    }
    else {
        num = math.fraction(num);
        return num.n + "/" + num.d;
    }
}

function numfix(str) {
    //example: -rad3
    if (isFinite(str)) {
        return str;
    }
    else {
    //check if str includes a "rad"
        if (str.includes("rad")) {
            if (str.charAt(0) == "-") {
                str = str.substring(4);
                return -Math.sqrt(parseInt(str));
            }
            else {
                str = str.substring(3);
                return Math.sqrt(parseInt(str));
            }
        }
        //check if str is a fraction
        if (str.includes("/")) {
            if (str.charAt(0) == "-") {
                str = str.substring(1);
                str = str.split("/");
                return -(parseInt(str[0]) / parseInt(str[1]));
            }
            else {
                str = str.split("/");
                return (parseInt(str[0]) / parseInt(str[1]));
            }
        }
        else return str;
    }
} 

function direttaindiretta(num) {
    num = num.toString();
    if (num.charAt(0) == "-") {
        return "<u>Indiretta</u>";
    }
    else {
        return "<u>Diretta</u>";
    }
}

function puntiuniti(aone, atwo, bone, btwo, cone, ctwo) {
    aone = aone - 1;
    cone = -cone;
    btwo = btwo - 1;
    ctwo = -ctwo;
    var a = [[aone, bone], [atwo, btwo]];
    var b = [cone, ctwo];
    try {
        var res = math.lusolve(a, b);
        res[0] = fraction(res[0].toString());
        res[1] = fraction(res[1].toString());
        res = "(" + res[0] + "; " + res[1] + ")";
    }
    
    catch {
        res = "Nessuno";
    }

    finally {
        return res;
    }
    
}