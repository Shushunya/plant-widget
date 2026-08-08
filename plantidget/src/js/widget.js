import { loadLanguage } from './modules/i18n.js';
import { initCalendar, goNextMonth, goPrevMonth } from './modules/calendar.js';

const { getCurrentWindow, Window } = window.__TAURI__.window;
const appWindow = getCurrentWindow();

document.addEventListener('DOMContentLoaded', async () => {
    await loadLanguage('uk-UA'); // TODO: Change to pull from rust backend 
    initCalendar('calendarDays', 'monthYear');
    setupWidgetControls();
});


function setupWidgetControls() {
    document.getElementById("prevMonthBtn")?.addEventListener('click', goPrevMonth);
    document.getElementById("nextMonthBtn")?.addEventListener('click', goNextMonth);

    document.getElementById("closeBtn")?.addEventListener('click', () => {
        appWindow.close();
    })

    document.getElementById("openMainBtn")?.addEventListener('click', async () => {
        try {
            const mainWindow = await Window.getByLabel('main');

            if (mainWindow) {
                await mainWindow.show();
                await mainWindow.setFocus();
            } else {
                console.error("Main window not found. Check the label in tauri.conf.json");
            }

            await appWindow.hide();

        } catch (error) {
            console.error("Failed to switch windows:", error);
        }
    })

    // THEME
    document.getElementById("themeToggleBtn")?.addEventListener('click', () => {
        document.body.classList.toggle("dark-theme");
    });


    document.getElementById("openPlantListBtn")?.addEventListener('click', () => {
        console.log("Show plant list");
    });

    document.getElementById("openSettingsBtn")?.addEventListener('click', () => {
        console.log("Open settings view");
    });
}
