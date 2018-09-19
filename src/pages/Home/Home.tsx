import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Hero, ProjectCard } from '#components';

import { colors } from '#themes';
import { ProjectsStoreProps } from '#stores';
import { inject, observer } from 'mobx-react';

const Summary = styled.section`
	background: ${colors.grey['700']};
	min-height: 24.0625rem;
	position: relative;
	color: #fff;
  text-align: center;
	margin-bottom: -20%;
	padding: 2rem;
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
		top: 0;
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

const ContentWrapper = styled.div`
	position: relative;
	z-index: 1;
	max-width: 50rem;
	margin: 0 auto;
`;

const Border = styled.div`
	margin: 1.6875rem 0;
	height: .125rem;
	border-top: 1px solid ${colors.grey['800']};
`;

export interface HomeProps { }

interface InjectedProps extends HomeProps {
	projectsStore: ProjectsStoreProps;
}

@inject('projectsStore')
@observer
export class Home extends Component {
	get injected(): InjectedProps {
		return this.props as InjectedProps;
	}
	componentDidMount() {
		this.injected.projectsStore.getActiveProjects();
	}
	render() {
		const { projects } = this.injected.projectsStore;
		return (
			<Fragment>
				<Hero>{''}</Hero>
				<Summary>
					<ContentWrapper>
						{projects.map(p => <ProjectCard key={p.id} project={p} />)}
					</ContentWrapper>
					<Border />
				</Summary>
			</Fragment>
		);
	}
}
