import React, { SFC } from 'react';
import { css } from 'react-emotion';
import Typography, { TypographyClassKey } from '@material-ui/core/Typography';

const H1Class = css`
  font-size: 3rem;
`;

const TypographyClasses: { [K in TypographyClassKey]?: string } = {
  display1: H1Class,
};

export const H1: SFC<{}> = props => {
  return (
    <Typography
      classes={TypographyClasses}
      color="textPrimary"
      variant="display1"
    >
      {props.children}
    </Typography>
  );
};
