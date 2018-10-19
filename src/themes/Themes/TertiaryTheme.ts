import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const tertiaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.green['600'],
      main: colors.red['400'],
      light: colors.grey['300'],
    },
    secondary: {
      dark: colors.red['400'],
      main: colors.green['600'],
      light: colors.blue['400'],
      contrastText: colors.white['400'],
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
