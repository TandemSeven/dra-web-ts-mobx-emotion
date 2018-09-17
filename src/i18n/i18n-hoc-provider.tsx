// third party
import React from 'react';
import { IntlProvider } from 'react-intl';
import { observer } from 'mobx-react';

// local
import { i18nStore } from './i18n-store';

// original version lifted from MIT licensed
// https://github.com/Sqooba/mobx-react-intl/blob/c6d2617846f9a3957312678d16a49ddda5724965/src/MobxIntlProvider.tsx
// modified to suite our needs better

type Props = IntlProvider.Props;

const _MobxIntlProvider: React.SFC<Props> = ({ children, ...rest }) => (
  <IntlProvider {...rest} key={i18nStore.locale} locale={i18nStore.locale} messages={i18nStore.messages}>
    {children}
  </IntlProvider>
);

export const MobxIntlProvider = observer(_MobxIntlProvider);
