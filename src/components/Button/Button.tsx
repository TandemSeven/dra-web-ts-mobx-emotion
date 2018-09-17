import React, { SFC } from 'react';
import { Button as MUIButton } from '@material-ui/core';
import { ButtonProps as MUIButtonProps } from '@material-ui/core/Button';

export const Button: SFC<MUIButtonProps> = (props) => <MUIButton {...props}>{props.children}</MUIButton>;
