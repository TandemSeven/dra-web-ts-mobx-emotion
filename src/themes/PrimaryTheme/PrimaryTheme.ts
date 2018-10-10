import { colors } from '../Colors';
import { Theme } from '../types/Theme';
import { injectGlobal } from 'react-emotion';
import 'typeface-montserrat';

/* tslint:disable:no-unused-expression */
injectGlobal`
  * {
    font-family: Montserrat, sans-serif !important;
    font-weight: normal;
    position: relative;
  }
  body {
    margin: 0;
    a {
      text-decoration: none;
    }
  }
`;
/* tslint:enable:no-unused-expression */

export const primaryTheme: Theme = {
  primary: {
    dark: colors.blue['400'],
    main: colors.blue['400'],
    light: colors.grey['400'],
    on: colors.white['400'],
  },
  secondary: {
    dark: colors.blue['400'],
    main: colors.blue['400'],
    light: colors.blue['400'],
    on: colors.white['400'],
  },
  background: {
    main: colors.grey['200'],
    on: colors.black['400'],
    overlay: 'rgba(1, 1, 1, 0.3)',
  },
  surface: {
    main: colors.white['400'],
    on: colors.black['400'],
  },
  error: {
    main: colors.red['400'],
    on: colors.white['400'],
  },
};
