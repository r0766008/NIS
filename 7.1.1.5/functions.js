// Function goal: assign functions to the buttons next to the table
// and setup the default mode (calculator)
function UISetup() {
    // Assign ChangeTableStyle (switching between dynamic, landscape and portrait)
    // on the click event of those buttons
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++)
        tableStyles[i].addEventListener("click", ChangeTableStyle);

    // Assign ChangeMode (switching between calculator and practice)
    // on the click event of those buttons as well
    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++)
        modes[i].addEventListener("click", ChangeMode);

    
    // This function is called after everything has been loaded in. At
    // this point, set the tablestyle and mode to what the user had before

    // However, if GetPreferences returns false, something went wrong
    // whilst fetching from localStorage. This presumably means that the
    // user hasn't been on this page before. If so, setup the default mode
    // (calculator) to make the table usable

    // (tableStyle doesn't need a fallback, as it will
    //  default to dynamic due to how the HTML is coded)
    if (!GetPreferences()) {
        SetupCalculator();  // Calculator is default mode
    }
}

// Function goal: set decimal value and bits to 0
function Reset() {
    document.getElementById("decimalValue").value = 0;
    var bits = document.getElementsByClassName("bit");
    for (var i = 0; i < bits.length; i++) bits[i].innerHTML = "0";
}

// Function goal: allow the user to switch the table style
function ChangeTableStyle(e) {
    // Enable all buttons -
    var tableStyles = document.getElementsByClassName("tableStyle");
    for (var i = 0; i < tableStyles.length; i++)
        tableStyles[i].disabled = false;

    // - except the one of the currently pressed button/activated style
    var selectedTableStyle = e.srcElement;
    selectedTableStyle.disabled = true;

    // Get the CSS HTML elements
    var portrait = document.getElementById("portrait");
    var landscape = document.getElementById("landscape");

    switch (selectedTableStyle.value) {
        // If dynamic is selected -
        case "dynamic":
            // - enable the CSS for portrait and landscape -
            portrait.disabled = false;
            landscape.disabled = false;
            // - and let the browser choose depending on the screen orientation.
            portrait.media = "(orientation: portrait)";
            landscape.media = "(orientation: landscape)";
            break;
        // If landscape is selected, force the landscape style by -
        case "landscape":
            portrait.disabled = true;  // - disabling portrait, -
            landscape.disabled = false;  // - enabling landscape -
            // - and removing the media condition for landscape.
            // (Otherwise the landscape screen orientation will remain necessary)
            landscape.media = "";
            break;
        // If portrait is selected, force portrait.
        // This is done in the same manner as above for landscape
        case "portrait":
            landscape.disabled = true;
            portrait.disabled = false;
            portrait.media = "";
            break;
    }

    // After changing the preferred tableStyle, save that tableStyle to preferences
    SavePreferences();
}

// Function goal: allow the user to switch between calculator and practice mode
function ChangeMode(e) {
    // Enable all mode buttons -
    var modes = document.getElementsByClassName("mode");
    for (var i = 0; i < modes.length; i++)
        modes[i].disabled = false;

    // - and disable the button of the currently selected mode
    e.srcElement.disabled = true;

    switch (e.srcElement.value) {
        // If the calculator button has been pressed -
        case "calculator":
            // - setup calculator, which allows the user to
            // freely modify the decimal value and bits.
            // When the decimal value is modified, the bits
            // are modified to equal to the decimal value, and
            // vica versa
            SetupCalculator();
            break;
        // If the practice button has been pressed -
        case "practice":
            // - start a new exercise, either giving bits 
            // or a decimal value, and asking the user to
            // calculate the other
            NewExercise();
            break;
    }

    // Save the last mode the user was using in localStorage
    SavePreferences();
}

// Function goal: get the user preferences from localstorage,
// and apply them by triggering the button click events.
// On success, return true. On fail, return false
function GetPreferences() {
    try {
        var tableStyle = localStorage.getItem("tableStyle")
        var mode = localStorage.getItem("mode");
        document.querySelector(".tableStyle[value=" + tableStyle + "]").click();
        document.querySelector(".mode[value=" + mode + "]").click();
        return true;
    }
    catch {
        return false;
    }
}

// Function goal: save the user preferences to localStorage
function SavePreferences() {
    var tableStyle = document.querySelector(".tableStyle[disabled]").value;
    var mode = document.querySelector(".mode[disabled]").value;
    localStorage.setItem("tableStyle", tableStyle);
    localStorage.setItem("mode", mode);
}

UISetup();
