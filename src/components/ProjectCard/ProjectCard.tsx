import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import IconButton, { IconButtonClassKey } from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import styled, { css } from 'react-emotion';

import { Hour } from '#components';
import { primaryTheme, colors } from '#themes';
import { Project } from '#types';

const Name = styled.h2`
  color: ${primaryTheme.primary.main};
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
`;

const Details = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    width: 33%;
    text-align: left;
  }
`;

const Discipline = styled(Grid)`
  color: ${colors.grey['800']};
  font-weight: 300;
  font-size: .875rem;
`;

const Location = styled(Discipline)`
  font-size: .625rem;
`;

const PaperRoot = css`
	padding: .5rem;
`;

const RemoveIcon = styled(AddCircleOutline)`
  transform: rotate(45deg);
`;

const IconButtonRoot = css`
  position: absolute;
  top: .25rem;
  right: .25rem;
`;

const PaperClasses: { [K in PaperClassKey]?: string } = {
  root: PaperRoot,
};

const IconButtonClasses: { [K in IconButtonClassKey]?: string } = {
  root: IconButtonRoot,
};

export interface ProjectCardProps {
  project: Project;
}

export class ProjectCard extends Component<ProjectCardProps> {
  render() {
    const { project } = this.props;
    const { name, discipline, location, hours } = project;
    return (
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12}>
          <Paper classes={PaperClasses}>
            <Grid container={true} alignItems='center'>
              <Grid item={true} sm={1}>
                <Hour hours={hours} />
              </Grid>
              <Grid item={true} sm={11}>
                <Details>
                  <Name>{name}</Name>
                  <Discipline>{discipline}</Discipline>
                  <Location>{location}</Location>
                </Details>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <IconButton aria-label='Remove' classes={IconButtonClasses} color='primary'>
          <RemoveIcon />
        </IconButton>
      </Grid >
    );
  }
}
