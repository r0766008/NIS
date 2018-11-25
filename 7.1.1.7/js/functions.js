function UISetup() {
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++)
        tableStyles[i].addEventListener("click", ChangeTableStyle);

    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++)
        modes[i].addEventListener("click", ChangeMode);

    document.getElementById("decimalValue").addEventListener("input", ChangeInput);
    document.getElementById("decimalValueClone").addEventListener("input", ChangeInput);

    SetupCalculator(); // Calculator is default mode
}

function Reset() {
    document.getElementById("decimalValue").value = 0;
    document.getElementById("decimalValueClone").value = 0;
    
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) bits[i].innerHTML = "0";
}

function ChangeInput(e){
    var value = e.srcElement.value;
    var test = document.getElementById("decimalValue")
    test.value = value;
    var test = document.getElementById("decimalValueClone");
    test.value = value;
    
}

function ChangeTableStyle(e) {
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++) {
        tableStyles[i].disabled = false;
        tableStyles[i].classList.add("teal");
        tableStyles[i].classList.add("lighten-4");
    }

    var selectedTableStyle = e.srcElement;
    selectedTableStyle.disabled = true;
    selectedTableStyle.classList.remove("teal");
    selectedTableStyle.classList.remove("lighten-4");

    var portrait = document.getElementById("portrait");
    var landscape = document.getElementById("landscape");

    switch (selectedTableStyle.innerHTML.toLowerCase()) {
        case "dynamic":
            landscape.className = "hide-on-med-and-down";
            portrait.className = "hide-on-large-only";
            landscape.style.display = "";
            portrait.style.display = "";
            break;
        case "landscape":
            landscape.style.display = "";
            portrait.style.display = "none";
            landscape.className = "";
            break;
        case "portrait":
            portrait.style.display = "";
            landscape.style.display = "none";
            portrait.className = "";
            break;
    }
}

function ChangeMode(e) {
    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++) {
        modes[i].disabled = false;
        modes[i].classList.add("teal");
        modes[i].classList.add("lighten-4");
    }

    var selectedTableStyle = e.srcElement;
    selectedTableStyle.disabled = true;
    selectedTableStyle.classList.remove("teal");
    selectedTableStyle.classList.remove("lighten-4");

    var calculator = document.getElementById("calculator");
    var practice = document.getElementById("practice");

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
