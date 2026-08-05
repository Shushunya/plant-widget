export let currLocaleCode = 'en-US';
let currDictionary = {};

// Load the dictionary
export async function loadLanguage(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        currDictionary = await response.json();

        currLocaleCode = lang;
        applyTranslations();

        // Update the HTML lang attribute for accessibility
        document.documentElement.lang = lang;
    } catch (error) {
        console.error(`Failed to load language: ${lang}`, error);
    }
}


export function applyTranslations() {
    // Standard text translations
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currDictionary[key]) {
            element.textContent = currDictionary[key];
        }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (currDictionary[key]) {
            element.placeholder = currDictionary[key];
        }
    });

    // Tooltips
    document.querySelectorAll('[data-i18n-tooltip]').forEach(element => {

        const key = element.getAttribute('data-i18n-tooltip');
        if (currDictionary[key]) {
            element.dataset.tooltip = currDictionary[key];
            element.setAttribute('aria-label', currDictionary[key]);
        }
    })
}
