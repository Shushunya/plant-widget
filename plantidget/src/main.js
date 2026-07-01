const { getCurrentWindow } = window.__TAURI__.window;
const appWindow = getCurrentWindow();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ELEMENTS
const monthYearElement = document.getElementById("monthYear");
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
