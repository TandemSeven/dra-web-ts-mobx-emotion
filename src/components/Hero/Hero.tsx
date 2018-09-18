import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { PaperClassKey, PaperProps } from '@material-ui/core/Paper';
import styled, { css } from 'react-emotion';

import { primaryTheme } from '#themes';
import { GroupButton } from '#components';

const PaperRoot = css`
	background: ${primaryTheme.primary.main};
	min-height: 16.125rem;
	display: flex;
	justify-content: center;
`;

const PaperClasses: { [K in PaperClassKey]?: string } = {
	root: PaperRoot,
};

const HeroContainer = styled(Paper)`
  max-height: 25rem;
`;

export class Hero extends Component<PaperProps> {
	render() {
		return (
			<HeroContainer classes={PaperClasses} elevation={0} square={true}>
				<GroupButton />
			</HeroContainer>
		);
	}
}
