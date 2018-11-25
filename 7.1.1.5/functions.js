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

    switch (e.srcElement.innerHTML.toLowerCase()) {
        case "calculator":
            SetupCalculator();
            break;
        case "practice":
            NewExercise();
            break;
    }
}

// TODO localstorage preferences

UISetup();
