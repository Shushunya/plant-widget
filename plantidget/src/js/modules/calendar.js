import { currLocaleCode } from "./i18n.js";

const dateElement = document.getElementById("dateBlock");

let currMonth = new Date().getMonth();
let currYear = new Date().getFullYear();
let gridElement, headerElement;

export function updateMainHeaderDate() {
    const now = new Date();

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    dateElement.textContent = new Intl.DateTimeFormat(currLocaleCode, dateOptions).format(now);
}

export function initCalendar(gridId, headerId) {
    gridElement = document.getElementById(gridId);
    headerElement = document.getElementById(headerId);
    renderCalendarGrid();
}

export function goNextMonth() {
    if (currMonth === 11) { currMonth = 0; currYear += 1; }
    else { currMonth += 1; }
    renderCalendarGrid();
}

export function goPrevMonth() {
    if (currMonth === 0) { currMonth = 11; currYear -= 1; }
    else { currMonth -= 1; }
    renderCalendarGrid();
}

function renderCalendarGrid() {
    // HEADER
    const date = new Date(currYear, currMonth, 1);

    const monthName = new Intl.DateTimeFormat(currLocaleCode, { month: 'long' }).format(date);
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    headerElement.textContent = `${capitalizedMonth} ${currYear}`;

    // CLEAN UP GRID
    if (!gridElement) return;
    gridElement.innerHTML = "";

    // CALENDAR MATH
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // starting with 0 for Sunday
    const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();

    const fragment = document.createDocumentFragment();

    // add empty days before the 1st
    for (let i = 0; i < firstDayOfMonth - 1; i++) {
        const emptyDayDiv = document.createElement("div");
        emptyDayDiv.classList.add("calendar-day", "empty-day");
        fragment.appendChild(emptyDayDiv);
    }

    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        dayDiv.textContent = i;

        if (i === today.getDate() && currMonth === today.getMonth() && currYear === today.getFullYear()) {
            dayDiv.classList.add("current-day"); // Add a blue/green highlight circle in your CSS!
        }
        const dateString = `${currYear}-${currMonth + 1}-${i}`;
        dayDiv.setAttribute("data-date", dateString);
        fragment.appendChild(dayDiv);
    }
    gridElement.appendChild(fragment);
}