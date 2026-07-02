const { getCurrentWindow } = window.__TAURI__.window;
const appWindow = getCurrentWindow();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// ELEMENTS
const monthYearElement = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarDays");
// BUTTONS
const closeWidgetBtn = document.getElementById("closeBtn");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

// STATE VARS
let currMonth;
let currYear;

function updateMonthDisplay() {
  if (monthYearElement) {
    monthYearElement.textContent = `${months[currMonth]} ${currYear}`;
  } else {
    console.error("Fail: Could not find an element with the ID 'monthYear'.");
  }

  renderCalendarGrid();
}

function renderCalendarGrid() {
  // Clear out the old calendar days before generating new ones
  if (!calendarGrid) return;
  calendarGrid.innerHTML = "";

  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  console.log(`First day of ${months[currMonth]}-${currYear} is ${weekDays[firstDayOfMonth]}`)
  
  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  console.log(daysInMonth)

  for (let i = 0; i < firstDayOfMonth; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("empty-day");
    calendarGrid.appendChild(newDiv);
    console.log("Empty day")
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("calendar-day");
    newDiv.innerText = `${i}`;
    calendarGrid.appendChild(newDiv);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  currMonth = now.getMonth();
  currYear = now.getFullYear();
  updateMonthDisplay();

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      if (currMonth === 11) {
        currMonth = 0;
        currYear += 1;
      } else {
        currMonth += 1;
      }
      updateMonthDisplay();
    });
  }

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      if (currMonth === 0) {
        currMonth = 11;
        currYear -= 1;
      } else {
        currMonth -= 1;
      }
      updateMonthDisplay();
    });
  }
  

  if (closeWidgetBtn) {
    closeWidgetBtn.addEventListener("click", () => {
      appWindow.close();
    });
  }
});
