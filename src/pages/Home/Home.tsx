import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Hero } from '#components';

import { colors } from '#themes';

const Summary = styled('section')`
	background: ${colors.grey['700']};
	min-height: 24.0625rem;
`;

export class Home extends Component<{}> {
	render() {
		return (
			<Fragment>
				<Hero>{''}</Hero>
				<Summary />
			</Fragment>
		);
	}
}
