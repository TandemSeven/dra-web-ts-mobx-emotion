import { createMuiTheme } from '@material-ui/core';
import { colors } from '../Colors';

export const tertiaryTheme = createMuiTheme({
  palette: {
    primary: {
      dark: colors.green['600'],
      main: colors.green['200'],
      light: colors.green['200'],
    },
    secondary: {
      dark: colors.red['700'],
      main: colors.red['800'],
      light: colors.grey['400'],
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
