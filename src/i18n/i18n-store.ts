// third party
import { action, observable } from 'mobx';

// local
import { defaultLocale, Locales } from './i18n-locales';
import { i18nBundles } from './i18n-bundles';
import { IntlMessageBundle } from './i18n-message-contract';

class IntlStore {

  @observable
  locale: Locales = 'en';

  @observable
  messages: IntlMessageBundle = i18nBundles[defaultLocale];

  @action
  setLocale = (locale: Locales) => {
    this.locale = locale;
    this.messages = i18nBundles[locale];
  }

}

export const i18nStore = new IntlStore();
