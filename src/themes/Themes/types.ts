export interface BaselinePart {
  main: string; // the main color for each category
  on: string; // the font color that should be displayed on the main color
  overlay?: string;
}

export interface PrimaryBaselinePart extends BaselinePart {
  dark: string; // a dark variant of the main color
  light: string; // a light variant of the main color
}

// derived from material design theming conventions https://material.io/design/color/the-color-system.html#color-theme-creation
export interface Theme {
  primary: PrimaryBaselinePart;
  secondary: PrimaryBaselinePart;
  background: BaselinePart;
  surface: BaselinePart;
  error: BaselinePart;
}
