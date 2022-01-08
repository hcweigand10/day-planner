var today = moment().format("dddd, MMMM Do");
var hour = moment().format("HH");
var day = $('#currentDay');
var time = $('#currentTime');
var textArea;

// initailize function
function init() {
    // loops through each row, sets background color acccording to its relative time and checks local storage for previous items
    for (let i = 9; i < 18; i++) {
        var row = (document.getElementById(i));
        textArea = row.children[1];
        // checks local storage
        var stored = localStorage.getItem(i);
        // if something is found, set it to text area
        if (stored != null) {
            textArea.value = stored;
        }
        // set background color classes based on time
        if (parseInt(hour) > parseInt(row.id)) {
            textArea.classList.add("past");
        } else if (parseInt(hour) == parseInt(row.id)) {
            textArea.classList.add("present");
        } else {
            textArea.classList.add("future");
        }
    }
}

// puts live clock in the header
function setTime() {
    // sets the date
    day.text(today);
    // sets the live time
    time.text(moment().format("h:mm:ss a"));
    timerInterval = setInterval(function() {
        time.text(moment().format("h:mm:ss a"));
    }, 1000);
}

// run on click of save button
function savePlanner(_this) {
    // quickly change button to "saved!"
    this.textContent = "Saved!";
    setTimeout(() => {
        this.textContent = "Save"
    }, 800);
    // capture what hour we are working with
    var timeSlot = this.parentNode.id;
    // select textArea
    textArea = document.getElementById(timeSlot).children[1];
    // save text area input to local storage
    localStorage.setItem(timeSlot, textArea.value);
}

// add event listeners to save buttons to run savePlanner
document.querySelectorAll(".saveBtn").forEach(function(btn) {
    btn.addEventListener("click", savePlanner)
})

// setup the page
init();
setTime();