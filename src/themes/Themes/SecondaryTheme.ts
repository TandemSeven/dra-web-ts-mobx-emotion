import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const secondaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.pink['400'],
      main: colors.orange['400'],
      light: colors.orange['400'],
    },
    secondary: {
      dark: colors.pink['400'],
      main: colors.pink['400'],
      light: colors.green['400'],
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
