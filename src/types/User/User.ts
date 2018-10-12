import { PRIMARY, SECONDARY, TERTIARY } from '#constants';

export type UserChosenTheme =
  | typeof PRIMARY
  | typeof SECONDARY
  | typeof TERTIARY;
