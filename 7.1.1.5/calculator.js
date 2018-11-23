function SetupCalculator() {
    Reset();

    var decimalValue = document.getElementById("decimalValue");
    decimalValue.removeEventListener("input", CalculateBits); // TODO
    decimalValue.addEventListener("input", CalculateBits);

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        bits[i].onclick = "";
        bits[i].addEventListener("click", ChangeBit);
    }
}

function ChangeBit(e) {
    var bit = e.srcElement;
    if (bit.innerHTML == "0") bit.innerHTML = "1";
    else bit.innerHTML = "0";
    CalculateDecimalValue();
}

function CalculateDecimalValue() {
    value = 0;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        if (bit.innerHTML == "1") value += parseInt(bit.value);
    }
    document.getElementById("decimalValue").value = value;
}

function CalculateBits() {
    value = parseInt(document.getElementById("decimalValue").value);
    var bits = document.getElementsByClassName("bit");
    // Goes from top to bottom, thus 128 to 1
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        var bitValue = parseInt(bit.value);
        if (value - bitValue >= 0) {
            value -= bitValue;
            bit.innerHTML = "1";
        } else bit.innerHTML = "0";
    }
}
