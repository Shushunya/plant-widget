const { invoke } = window.__TAURI__.core;

import { loadLanguage } from './modules/i18n.js';
import { updateMainHeaderDate } from './modules/calendar.js';
import { initRouter } from './modules/router.js';

document.addEventListener('DOMContentLoaded', async () => {
    initRouter();
    await loadLanguage('uk-UA');
    updateMainHeaderDate();
});