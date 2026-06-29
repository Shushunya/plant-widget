// const { invoke } = window.__TAURI__.core;

const { getCurrentWindow } = window.__TAURI__.window;
const appWindow = getCurrentWindow();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthYearElement = document.getElementById("monthYear");
const closeWidgetBtn = document.getElementById("closeBtn");

function getCurrentMonthYear() {
  const now = new Date();
  const year = now.getFullYear();
  let month = months[now.getMonth()];

  if (monthYearElement) {
    monthYearElement.textContent = `${month} ${year}`;
    console.log("Success")
  } else {
    console.error("Fail: Could not find an element with the ID 'monthYear'.");
  }

}


window.addEventListener("DOMContentLoaded", () => {

  getCurrentMonthYear();

  const closeBtn = document.getElementById("closeBtn");
  if (closeWidgetBtn) {
    closeWidgetBtn.addEventListener("click", () => {
      appWindow.close();
    });
  }

});
