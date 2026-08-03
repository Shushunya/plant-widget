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

const mainView = document.getElementById("mainView");

const settingsBtn = document.getElementById("mainSettingsBtn");
const settingsBackToMainBtn = document.getElementById("settingsBackToMainBtn");
const settingsView = document.getElementById("settingsView");

const aboutBtn = document.getElementById("aboutBtn");
const aboutBackToMainBtn = document.getElementById("aboutBackToMainBtn");
const aboutView = document.getElementById("aboutView");

const addPlantBtn = document.getElementById("addPlantBtn");
const savePlantBtn = document.getElementById("savePlantBtn");
const addPlantView = document.getElementById("addPlantFromView");

if (addPlantBtn) {
    addPlantBtn.addEventListener("click", () => {
        mainView.classList.add("hidden");
        addPlantView.classList.remove("hidden");
    })
}

if (savePlantBtn) {
    savePlantBtn.addEventListener("click", () => {
        addPlantView.classList.add("hidden");
        mainView.classList.remove("hidden");
    })
}

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
    
    console.log(now.toLocaleString('default', {month: 'long'}));
}

getDateNow();
// document.getElementById('save-btn').addEventListener('click', sendPlantToBackend);

// 1. Set default state
let currentLanguage = 'ua'; 
let translations = {};

// 2. Fetch the JSON dictionary
async function loadLanguage(lang) {
    try {
        // Tauri serves files via localhost, so standard fetch works perfectly
        const response = await fetch(`./locales/${lang}.json`);
        translations = await response.json();
        
        // Update the global language variable and apply the text
        currentLanguage = lang;
        applyTranslations();
        
        // Update the HTML lang attribute for accessibility
        document.documentElement.lang = lang;
    } catch (error) {
        console.error(`Failed to load language: ${lang}`, error);
    }
}

// 3. Swap out the text in the DOM
function applyTranslations() {
    // Find all elements with standard text translations
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    // Find all elements that need placeholder translations (like search bars)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
}

// Initialize the app with your preferred language
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('en'); // Load Ukrainian on boot
});