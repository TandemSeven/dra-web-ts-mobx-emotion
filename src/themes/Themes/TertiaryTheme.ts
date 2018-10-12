import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const tertiaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.blue['600'],
      main: colors.green['400'],
      light: colors.red['200'],
    },
    secondary: {
      dark: colors.orange['300'],
      main: colors.pink['400'],
      light: colors.grey['400'],
    },
    error: {
      main: colors.red['400'],
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});
