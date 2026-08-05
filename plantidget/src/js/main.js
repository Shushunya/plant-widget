const { invoke } = window.__TAURI__.core;

import { loadLanguage } from './modules/i18n.js';
import { updateMainHeaderDate } from './modules/calendar.js';

// // When a user clicks the language toggle switch:
// async function handleLanguageSwitch(newLang) {
//     await loadLanguage(newLang); // Updates static text (Settings, etc.)
//     updateMainHeaderDate();          // Triggers the date to redraw in the new language
// }


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

document.addEventListener('DOMContentLoaded', async () => {
    await loadLanguage('uk-UA');
    updateMainHeaderDate();          // Triggers the date to redraw in the new language

});