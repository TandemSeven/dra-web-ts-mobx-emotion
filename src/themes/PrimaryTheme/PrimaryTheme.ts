import { colors } from '../Colors';
import { Theme } from '../types/Theme';
import { injectGlobal } from 'react-emotion';
import 'typeface-poppins';

/* tslint:disable:no-unused-expression */
injectGlobal`
  * {
    font-family: Poppins, sans-serif;
    font-weight: normal;
    position: relative;
  }
  a {
    text-decoration: none;
  }
`;
/* tslint:enable:no-unused-expression */

export const primaryTheme: Theme = {
  primary: {
    dark: colors.blue['400'],
    main: colors.blue['400'],
    light: colors.blue['400'],
    on: '#fff',
  },
  secondary: {
    dark: colors.blue['400'],
    main: colors.blue['400'],
    light: colors.blue['400'],
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
