function UISetup() {
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++)
        tableStyles[i].addEventListener("click", ChangeTableStyle);

    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++)
        modes[i].addEventListener("click", ChangeMode);
    
    SetupCalculator();  // Calculator is default mode
}

function Reset() {
    document.getElementById("decimalValue").value = 0;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) bits[i].innerHTML = "0";
}

function ChangeTableStyle(e) {
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++)
        tableStyles[i].disabled = false;

    var selectedTableStyle = e.srcElement;
    selectedTableStyle.disabled = true;

    var portrait = document.getElementById("portrait");
    var landscape = document.getElementById("landscape");

    switch (selectedTableStyle.innerHTML.toLowerCase()) {
        case "dynamic":
            portrait.disabled = false;
            landscape.disabled = false;
            portrait.media = "(orientation: portrait)";
            landscape.media = "(orientation: landscape)";
            break;
        case "landscape":
            portrait.disabled = true;
            landscape.disabled = false;
            landscape.media = "";
            break;
        case "portrait":
            landscape.disabled = true;
            portrait.disabled = false;
            portrait.media = "";
            break;
    }
}

function ChangeMode(e) {
    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++)
        modes[i].disabled = false;

    e.srcElement.disabled = true;

    var calculator = document.getElementById("calculator");
    var practice = document.getElementById("practice");

    switch (e.srcElement.innerHTML.toLowerCase()) {
        case "calculator":
            calculator.disabled = true;
            practice.disabled = false;
            SetupCalculator();
            break;
        case "practice":
            practice.disabled = true;
            calculator.disabled = false;
            NewExercise();
            break;
    }
}

// TODO localstorage preferences

UISetup();
