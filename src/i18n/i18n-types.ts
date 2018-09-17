// first party
import { Omit, PropertiesOfType } from '#types';

// local
import { IntlMessageBundle, IntlMessageContract, IntlMessageIDs } from './i18n-message-contract';
import { Locales } from './i18n-locales';

export type Bundles = {
  [K in Locales]: IntlMessageBundle;
};

// all i18n message bundle props which have *NO* data values
export type NoDataProperties = Pick<IntlMessageContract, PropertiesOfType<IntlMessageContract, never>>;
// all i18n message bundle props which *HAVE* data values
export type WithDataProperties = Omit<IntlMessageContract, keyof NoDataProperties>;

// SFC props for i18n messages which require no data
interface INoDataProps<K extends keyof NoDataProperties> {
  id: K;
  // we make values optional and force it's value to undefined
  // this is the secret sauce for the nifty dynamic generic inference at <IntlMessage> enables
  values?: undefined;
}

// SFC props for i18n messages which require data values
interface IWithDataProps<K extends keyof WithDataProperties> {
  id: K;
  values: WithDataProperties[K];
}

export type NoDataKeys = keyof NoDataProperties;
export type WithDataKeys = keyof WithDataProperties;

// SFC conditional type which changes the contract between the required or optional .values by
// swapping between INoDataProps and IWithDataProps based on whether the inferred message ID key
// belongs to either no data/with data message IDs
type GenericIntlMessageIDProps<T extends IntlMessageIDs> =
  T extends keyof NoDataProperties ?
  INoDataProps<NoDataKeys> : T extends keyof WithDataProperties ?
  IWithDataProps<WithDataKeys> : never;

export type IntlMessageProps = GenericIntlMessageIDProps<IntlMessageIDs>;
