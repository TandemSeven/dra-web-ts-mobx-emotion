import React, { SFC } from 'react';
import { css } from 'react-emotion';
import Typography, { TypographyClassKey } from '@material-ui/core/Typography';
import { primaryTheme } from '#themes';

const H1Class = css`
  font-size: 3rem;
  color: ${primaryTheme.primary.main};
`;

const TypographyClasses: { [K in TypographyClassKey]?: string } = {
  display1: H1Class,
};

export const H1: SFC<{}> = props => {
  return (
    <Typography classes={TypographyClasses} variant="display1">
      {props.children}
    </Typography>
  );
};
