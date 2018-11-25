function random(min, max) {
    // Since I cannot write it any shorter than from the source,
    // copied from https://www.w3schools.com/js/js_random.asp
    return Math.floor(Math.random() * (max - min)) + min;
}

function NewExercise() {
    Reset();
    
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        bits[i].removeEventListener("click", ChangeBit);
        bits[i].addEventListener("click", ChangeBitNoCalc);
    }
    
    DecimalToBinary();
}

function DecimalToBinary() {
    // Give the user a decimal
    randomNumber = random(0, 256);
    document.getElementById("decimalValue").value = randomNumber;
    document.getElementById("decimalValueClone").value = randomNumber;

    // When decimal is given, allow user to modify bits
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++)
        bits[i].disabled = false;

    // Set answer to check the asked bit value
    var checkAnswer = document.getElementById("answer");
    checkAnswer.addEventListener("click", CheckAskedBits);
}

function ChangeBitNoCalc(e) {
    var bit = e.srcElement;
    test = bit.innerHTML;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        if (bits[i].value == bit.value) {
            if (test == "0") {
                bits[i].innerHTML = "1";
            } else {
                bits[i].innerHTML = "0";
            }
        }
    }
}

function CheckAskedBits() {
    var correctValue = parseInt(document.getElementById("decimalValue").value);
    var correctBits = "";

    var userValue = 0;
    var userBits = "";

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length/2; i++) {
        var bit = bits[i];
        var bitValue = parseInt(bit.value);
        if (correctValue - bitValue >= 0) {
            correctValue -= bitValue;
            correctBits += "1";
        } else correctBits += "0";
    }

    for (var i = 0; i < bits.length/2; i++) {
        var bit = bits[i];
        userBits += bit.innerHTML;

        if (bit.value == "1") userValue += parseInt(bit.value);
    }

    if (correctBits == userBits) alert("Correct!");
    else alert("Incorrect! The answer you gave was " + userBits + " but the correct answer is " + correctBits + "!");

    NewExercise();
}

/*
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
}*/
