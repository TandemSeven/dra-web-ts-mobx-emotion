import { colors } from '../Colors';
import { Theme } from '../types/Theme';

export const darkTheme: Theme = {
  primary: {
    dark: colors.green['700'],
    main: colors.green['500'],
    light: colors.green['300'],
    on: '#fff',
  },
  secondary: {
    dark: colors.green['700'],
    main: colors.green['500'],
    light: colors.green['300'],
    on: '#fff',
  },
  background: {
    main: '#eee',
    on: '#000000',
  },
  surface: {
    main: '#fff',
    on: '#000000',
  },
  error: {
    main: '#b00020',
    on: '#fff',
  },
};
