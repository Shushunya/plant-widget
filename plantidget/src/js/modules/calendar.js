import { currLocaleCode } from "./i18n.js";

const dateElement = document.getElementById("dateBlock");

export function updateMainHeaderDate() {
    const now = new Date();

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    // const [day, month, year] = [
    //     now.getDate(),
    //     now.getMonth(),
    //     now.getFullYear()
    // ];


    // let monthFormatted;
    // if (month.toString().length < 2) {
    //     monthFormatted = `0${month}`;
    // } else {
    //     monthFormatted = month.toString();
    // }

    console.log(currLocaleCode);
    const formattedDate = new Intl.DateTimeFormat(currLocaleCode, dateOptions).format(now);
    dateElement.textContent = formattedDate;
    // const datetimeAtr = `${year}-${monthFormatted}-${day}`;

    // dateElement.textContent = `${months[month]} ${day}, ${year}`;
    // dateElement.textContent = new Intl.DateTimeFormat(currentLanguage, dateOptions).format(now);
    // dateElement.setAttribute("datetime", datetimeAtr);

    // console.log(now.toLocaleString('ua', {month: 'long'}));
}

// getDateNow();
// document.getElementById('save-btn').addEventListener('click', sendPlantToBackend);