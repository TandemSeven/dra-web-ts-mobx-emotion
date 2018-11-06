import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const primaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.pink['400'],
      main: colors.blue['300'],
      light: colors.white['400'],
      contrastText: colors.white['400'],
    },
    secondary: {
      dark: colors.white['400'],
      main: colors.white['400'],
      light: colors.white['400'],
      contrastText: colors.blue['400'],
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
