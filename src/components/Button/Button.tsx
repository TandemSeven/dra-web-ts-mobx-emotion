import React, { SFC } from 'react';
import { Button as MUIButton } from '@material-ui/core';
import {
  ButtonProps as MUIButtonProps,
  ButtonClassKey,
} from '@material-ui/core/Button';
import { css } from 'emotion';

import { colors } from '#themes';

const ButtonClassesRoot = css`
  display: flex;
  flex: 1;
  font-size: 0.75rem;
`;

const ButtonClassesContainedSecondary = css`
  background: ${colors.transparent['800']};
  border: red;
`;

export const ButtonClasses: { [K in ButtonClassKey]?: string } = {
  root: ButtonClassesRoot,
  containedSecondary: ButtonClassesContainedSecondary,
};

export const Button: SFC<MUIButtonProps> = props => (
  <MUIButton {...props} classes={ButtonClasses}>
    {props.children}
  </MUIButton>
);
