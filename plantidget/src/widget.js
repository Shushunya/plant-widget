const { getCurrentWindow, Window } = window.__TAURI__.window;
const appWindow = getCurrentWindow();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// ELEMENTS
const monthYearElement = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarDays");
// BUTTONS
const closeWidgetBtn = document.getElementById("closeBtn");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const plantListBtn = document.getElementById("openPlantListBtn");
const openMainBtn = document.getElementById("openMainBtn");
const toggleThemeBtn = document.getElementById("themeToggleBtn");
const settingsBtn = document.getElementById("openSettingsBtn");

// STATE VARS
let currMonth;
let currYear;

console.log(appWindow)

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

  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // starting with 0 for Sunday
  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < firstDayOfMonth - 1; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("empty-day");
    fragment.appendChild(newDiv);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const newDiv = document.createElement("div");
    const dateString = `${currYear}-${currMonth}-${i}`;
    newDiv.classList.add("calendar-day");
    if (i == 2) {
      newDiv.classList.add("fertilize-day");
    } else if (i == 5) {
      newDiv.classList.add("water-day");
    };
    
    newDiv.setAttribute("data-date", dateString);
    newDiv.innerText = `${i}`;
    fragment.appendChild(newDiv);
  }
  calendarGrid.appendChild(fragment);
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

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      // .toggle() adds the class if it's missing, and removes it if it's there!
      document.body.classList.toggle("dark-theme");
    });
  }

  if (openMainBtn) {
    openMainBtn.addEventListener("click", async () => {
      // const mainWindow = await Window.getByLabel("main");
      // await mainWindow.show();
      // await mainWindow.setFocus();
      console.log("Clicked 'Open Dashboard' Button.")
    });
  }

  if (plantListBtn) {
    plantListBtn.addEventListener("click", async () => {
      console.log("Clicked on 'Show palnts list' btn.")
    })
  }

  if (settingsBtn) {
    settingsBtn.addEventListener("click", async () => {
      console.log("Settings");
    })
  }


  if (closeWidgetBtn) {
    closeWidgetBtn.addEventListener("click", () => {
      appWindow.close();
    });
  }
});
