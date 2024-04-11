import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

export const allLocales = ["en", "ru"];

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "ru",
  fallbackLocale: "ru",
  messages: messages,
});

export default i18n;

export async function setLocale(locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale);
    if (messages === undefined) {
      return;
    }
    i18n.global.setLocaleMessage(locale, messages);
  }
  i18n.global.locale.value = locale;
  localStorage.setItem("locale", locale);
}

function loadLocale(locale) {
  return fetch(`./locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error);
    });
}
