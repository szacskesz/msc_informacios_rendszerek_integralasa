import { registerLocaleData } from '@angular/common';
import localeHU from '@angular/common/locales/hu';

export const APP_LOCALE_ID: string = 'hu-HU';

export function registerLocale() {
    registerLocaleData(localeHU, APP_LOCALE_ID);
}
