const { invoke } = window.__TAURI__.core;


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function sendPlantToBackend() {
    const myNewPlant = {
        id: 3,
        name: "Ficus Benjamin",
        genus: "Other",
        species: "F. benjamina",
        
        growth_start: "April",
        growth_end: "September",
        
        watering: {
            growth_interval_days: 5,
            dormant_interval_days: 12
        },
        fertilizing: {
            growth_interval_days: 14,
            dormant_interval_days: 60
        },
        fertilizer_dilution: "1:4",
        
        misting_interval_days: 2,
        light: "BrightIndirect",
        soil: "WellDraining",
        
        last_watered: null,
        last_fertilized: null,
        notes: ["Любить обприскування", "Не любить протягів"]
    };

    try {
        const response = await invoke('add_plant', { newPlant: myNewPlant });
        
        console.log("Відповідь від Rust:", response);
        alert(response);
        
    } catch (error) {
        console.error("Помилка при додаванні рослини:", error);
    }
}

const dateElement = document.getElementById("dateBlock");

const settingsBtn = document.getElementById("mainSettingsBtn");
const aboutBtn = document.getElementById("aboutBtn");
const settingsBackToMainBtn = document.getElementById("settingsBackToMainBtn");
const aboutBackToMainBtn = document.getElementById("aboutBackToMainBtn");

const mainView = document.getElementById("mainView");
const settingsView = document.getElementById("settingsView");
const aboutView = document.getElementById("aboutView");

if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    mainView.classList.add("hidden");
    settingsView.classList.remove("hidden");
  });
}

if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
        mainView.classList.add("hidden");
        aboutView.classList.remove("hidden");
    })
}

if (settingsBackToMainBtn) {
  settingsBackToMainBtn.addEventListener("click", () => {
    settingsView.classList.add("hidden");
    mainView.classList.remove("hidden");
  });
}

if (aboutBackToMainBtn) {
  aboutBackToMainBtn.addEventListener("click", () => {
    aboutView.classList.add("hidden");
    mainView.classList.remove("hidden");
  });
}

function getDateNow() {
    let now = new Date();
    const [day, month, year] = [
        now.getDate(),
        now.getMonth(),
        now.getFullYear()
    ];

    let monthFormatted;
    if (month.toString().length < 2) {
        monthFormatted = `0${month}`;
    } else {
        monthFormatted = month.toString();
    }

    const datetimeAtr = `${year}-${monthFormatted}-${day}`;

    dateElement.textContent = `${months[month]} ${day}, ${year}`;
    dateElement.setAttribute("datetime", datetimeAtr);
    
    // console.log(now.toDateString());
}

getDateNow();
// document.getElementById('save-btn').addEventListener('click', sendPlantToBackend);