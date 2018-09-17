export type IntlMessageIDs = keyof IntlMessageContract;

export type IntlMessageData = {
  [P in IntlMessageIDs]: IntlMessageContract[P];
};

export type IntlMessageBundle = {
  [P in IntlMessageIDs]: string;
};

// there is no sane way to enforce that to the following IntlMessageContract interface structure
// is of the expected type
//
// 🦄🦄🦄 HOWEVER!  If you incorrectly define the data contract here ./i18n-component's IntlMessage
//                 SFC will break, so we do actually get compile time safety in a roundabout way

// the key is i18n message ID, and value type must be:
// never | { [keyof: string] : string | number | boolean | Date | null | undefined }

export interface IntlMessageContract {
  'labels.goodbye': never;
  'labels.hello': { world: string };
}
