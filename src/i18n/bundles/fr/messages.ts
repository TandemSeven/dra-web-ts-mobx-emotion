// local
import { IntlMessageBundle } from '../../i18n-message-contract';
import { messages as defaultMessages } from '../default';

export const messages: IntlMessageBundle = {
  ...defaultMessages,
  'labels.goodbye': 'Ar revoir',
  'labels.hello': 'Bonjour {world}',
};
