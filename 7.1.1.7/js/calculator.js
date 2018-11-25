function SetupCalculator() {
    Reset();

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        bits[i].removeEventListener("click", ChangeBitNoCalc);
        bits[i].addEventListener("click", ChangeBit);
    }
}

function ChangeBit(e) {
    var bit = e.srcElement;
    currentBit = bit.innerHTML;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        if (bits[i].value == bit.value) {
            if (currentBit == "0") {
                bits[i].innerHTML = "1";
            } else {
                bits[i].innerHTML = "0";
            }
        }
    }
    CalculateDecimalValue();
}

function CalculateDecimalValue() {
    value = 0;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length / 2; i++) {
        var bit = bits[i];
        if (bit.innerHTML == "1") value += parseInt(bit.value);
    }
    document.getElementById("decimalValue").value = value;
    document.getElementById("decimalValueClone").value = value;
}
