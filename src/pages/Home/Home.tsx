import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Hero } from '#components';

import { colors } from '#themes';

const Summary = styled('section')`
	background: ${colors.grey['700']};
	min-height: 24.0625rem;
	position: relative;
	color: #fff;
  margin: 3.125rem 0;
  padding: 20% 1.25rem;
  text-align: center;
	&:before,
	&:after {
		background: inherit;
		content: "";
		height: 50%;
		left: 0;
		position: absolute;
		right: 0;
		z-index: -1;
	}
	&:before {
		top: 5rem;
		z-index: 1;
		transform: skewY(1.5deg);
		transform-origin: 100% 0;
	}
	&:after {
		bottom: 0;
  	transform: skewY(-1.5deg);
  	transform-origin: 100%;
	}
`;

export class Home extends Component {
	render() {
		return (
			<Fragment>
				<Hero>{''}</Hero>
				<Summary />
			</Fragment>
		);
	}
}
