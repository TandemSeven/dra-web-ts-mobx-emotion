import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import styled, { css } from 'react-emotion';

import { primaryTheme } from '#themes';

const PaperRoot = css`
	min-height: 22.125rem;
	display: flex;
	justify-content: center;
	padding: 1.5rem 0;
	background: #ca800d; // temp background
`;

const PaperClasses: { [K in PaperClassKey]?: string } = {
	root: PaperRoot,
};

const HeroContainer = styled(Paper)`
  max-height: 25rem;
	padding: 0;
`;

const SVGCurve = styled('svg')`
	background: transparent;
	position: absolute;
	bottom: 0;
`;
export interface HeroProps { }
export class Hero extends Component<HeroProps> {
	render() {
		return (
			<HeroContainer classes={PaperClasses} elevation={0} square={true}>
				<SVGCurve viewBox='0 0 100 17'>
					<path fill={primaryTheme.primary.main} d='M0 30 V15 Q30 3 60 15 V30z' />
					<path fill={primaryTheme.surface.main} d='M0 30 V12 Q30 17 55 12 T100 11 V30z' />
				</SVGCurve>
			</HeroContainer>
		);
	}
}

