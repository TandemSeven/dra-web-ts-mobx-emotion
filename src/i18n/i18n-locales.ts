// third party
import { addLocaleData } from 'react-intl';

// locale data
// tslint:disable-next-line:no-submodule-imports
import enLocaleData from 'react-intl/locale-data/en';
// tslint:disable-next-line:no-submodule-imports
import frLocaleData from 'react-intl/locale-data/fr';

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);

export type Locales = 'en' | 'fr';

export const defaultLocale: Locales = 'en';

export const allLocales: Locales[] = [ 'en', 'fr' ];
