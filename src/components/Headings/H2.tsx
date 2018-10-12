import React, { SFC } from 'react';
import { css } from 'react-emotion';
import Typography, { TypographyClassKey } from '@material-ui/core/Typography';

const H2Class = css`
  font-size: 2.85rem;
`;

const TypographyClasses: { [K in TypographyClassKey]?: string } = {
  display2: H2Class,
};

export const H2: SFC<{}> = ({ children }) => (
  <Typography
    classes={TypographyClasses}
    color="textPrimary"
    variant="display2"
  >
    {children}
  </Typography>
);
