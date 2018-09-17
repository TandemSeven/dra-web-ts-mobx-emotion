import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { PaperClassKey, PaperProps } from '@material-ui/core/Paper';
import styled, { css } from 'react-emotion';

import { primaryTheme } from '#themes';

const PaperRoot = css`
	background: ${primaryTheme.primary.main};
	min-height: 16.125rem;
`;

const PaperClasses: { [K in PaperClassKey]?: string } = {
	root: PaperRoot,
};

const HeroContainer = styled(Paper)`
  max-height: 400px;
`;

export class Hero extends Component<PaperProps> {
	render() {
		return (
			<HeroContainer classes={PaperClasses} elevation={0} square={true}>
				yoyoy
			</HeroContainer>
		);
	}
}
