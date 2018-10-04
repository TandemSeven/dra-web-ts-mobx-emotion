import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Hero, ProjectCard } from '#components';

import { colors } from '#themes';
import { ProjectsStoreProps } from '#stores';
import { inject, observer } from 'mobx-react';

const Summary = styled.section``;

const ContentWrapper = styled.div`
	position: relative;
	z-index: 1;
	max-width: 50rem;
	margin: 0 auto;
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
				<Hero />
				<Summary>
					<ContentWrapper>
						{projects.map(p => <ProjectCard key={p.id} project={p} />)}
					</ContentWrapper>
				</Summary>
			</Fragment>
		);
	}
}
