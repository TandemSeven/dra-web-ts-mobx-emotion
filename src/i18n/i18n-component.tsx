// third party
import React from 'react';
import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

// local
import { IntlMessageProps } from './i18n-types';

const IntlMessageComponent: React.SFC<IntlMessageProps> = ({ id, values }) => (
  <FormattedMessage id={id} values={values} />
);

export const IntlMessage = observer(IntlMessageComponent);
