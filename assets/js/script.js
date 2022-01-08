var today = moment().format("dddd, MMMM Do");
var hour = moment().format("HH");
var day = $('#currentDay');
var time = $('#currentTime');
var textArea;
// test
hour = 11;

// initailize function
function init() {
    console.log("init");
    //sets the date in header
    day.text(today);
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
        if (hour > row.id) {
            textArea.classList.add("past");
        } else if (hour == row.id) {
            textArea.classList.add("present");
        } else {
            textArea.classList.add("future");
        }
    }
}

// puts live clock in the header
function setTime() {
    time.text(moment().format("H:mm:ss a"));
    timerInterval = setInterval(function() {
        time.text(moment().format("H:mm:ss a"));
    }, 1000);
    console.log("time");
}


function savePlanner(_this) {
    console.log("save");
    // quickly chane button to "saved!"
    this.textContent = "Saved!";
    setTimeout(() => {
        this.textContent = "Save"
    }, 800);
    // capture what hour we are working with
    var timeSlot = this.parentNode.id;
    // select textArea
    textArea = document.getElementById(timeSlot).children[1];
    localStorage.setItem(timeSlot, textArea.value);
}

document.querySelectorAll(".saveBtn").forEach(function(btn) {
    btn.addEventListener("click", savePlanner)
})

init();

setTime();