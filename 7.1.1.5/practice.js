function random(min, max) {
    // Since I cannot write it any shorter than from the source,
    // copied from https://www.w3schools.com/js/js_random.asp
    return Math.floor(Math.random() * (max - min)) + min;
}

function NewExercise() {
    Reset();

    var decimalValue = document.getElementById("decimalValue");
    // Remove CalculateBits from calculator.js
    decimalValue.removeEventListener("input", CalculateBits);
    decimalValue.disabled = true;

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        bit.disabled = true;
        bit.removeEventListener("click", ChangeBit);
        bit.addEventListener("click", ChangeBitPractice);
    }

    if (random(0, 2) == 0) GiveDecimalAskBits();
    else GiveBitsAskDecimal();
}

function GiveDecimalAskBits() {
    // Give the user a decimal
    document.getElementById("decimalValue").value = random(0, 256);

    // When decimal is given, allow user to modify bits
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++)
        bits[i].disabled = false;

    // Set answer to check the asked bit value
    var checkAnswer = document.getElementById("answer");
    checkAnswer.removeEventListener("click", CheckAskedDecimalValue);
    checkAnswer.addEventListener("click", CheckAskedBits);
}

function GiveBitsAskDecimal() {
    // Give bits
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++)
        bits[i].innerHTML = random(0, 2);

    // When bits are given, allow user to modify decimal value
    document.getElementById("decimalValue").disabled = false;

    // Set answer to check the asked decimal value
    var checkAnswer = document.getElementById("answer");
    checkAnswer.removeEventListener("click", CheckAskedBits);
    checkAnswer.addEventListener("click", CheckAskedDecimalValue);
}

function ChangeBitPractice(e) {
    var bit = e.srcElement;
    if (bit.innerHTML == "0") bit.innerHTML = "1";
    else bit.innerHTML = "0";
}

function CheckAskedBits() {
    var correctValue = parseInt(document.getElementById("decimalValue").value);
    var correctBits = "";

    var userValue = 0;
    var userBits = "";

    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        var bitValue = parseInt(bit.value);
        if (correctValue - bitValue >= 0) {
            correctValue -= bitValue;
            correctBits += "1";
        } else correctBits += "0";
    }

    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        userBits += bit.innerHTML;

        if (bit.value == "1") userValue += parseInt(bit.value);
    }

    if (correctBits == userBits) alert("Correct!");
    else alert("Incorrect! The answer you gave was " + userBits + " but the correct answer is " + correctBits + "!");

    NewExercise();
}

function CheckAskedDecimalValue() {
    var answer = parseInt(document.getElementById("decimalValue").value);

    correctValue = 0;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) {
        var bit = bits[i];
        if (bit.innerHTML == "1") correctValue += parseInt(bit.value);
    }

    if (correctValue == answer) alert("Correct!");
    else alert("Incorrect! The answer you gave was " + answer + ", but the correct answer is " + correctValue + "!");

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
