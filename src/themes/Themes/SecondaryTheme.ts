import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const secondaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.orange['600'],
      main: colors.orange['400'],
      light: colors.orange['300'],
    },
    secondary: {
      dark: colors.green['400'],
      main: colors.green['400'],
      light: colors.green['400'],
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
