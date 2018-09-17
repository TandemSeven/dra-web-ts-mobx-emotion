import { createMuiTheme } from '@material-ui/core/styles';
import { primaryTheme } from './PrimaryTheme';

export * from './Colors';
export { primaryTheme } from './PrimaryTheme';

export const appTheme = createMuiTheme({
	palette: {
		primary: {
			main: primaryTheme.primary.main,
		},
		secondary: {
			main: primaryTheme.secondary.main,
		},
		error: {
			main: primaryTheme.error.main,
		},
		text: {
			secondary: '#aaa',
		},
	},
});
