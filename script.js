function calcola() {
    aone = document.getElementById("id_xone").value;
    atwo = document.getElementById("id_xtwo").value;
    bone = document.getElementById("id_yone").value;
    btwo = document.getElementById("id_ytwo").value;
    //maybe c1 and c2 are not needed

    det = determinante(numfix(aone), numfix(atwo), numfix(bone), numfix(btwo));
    document.getElementById("answertext").innerHTML = "Determinante: " + det;
}

function determinante(aone, atwo, bone, btwo) {
    var det = aone * btwo - atwo * bone;
    if (isNaN(det)) {
        return "Input non valido";
    } 
    else {
        if (math.fraction(det).d == 1) {
            return det;
        }
        if (det < 0) {
            det = math.fraction(det);
            return "-" + det.n + "/" + det.d;
        }
        else {
            det = math.fraction(det);
            return det.n + "/" + det.d;
        }
        
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
