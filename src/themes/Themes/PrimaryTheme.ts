import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const primaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.red['400'],
      main: colors.blue['400'],
      light: colors.white['400'],
    },
    secondary: {
      dark: colors.red['300'],
      main: colors.red['400'],
      light: colors.red['600'],
    },
    error: {
      main: colors.red['400'],
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    useNextVariants: true,
  },
});
