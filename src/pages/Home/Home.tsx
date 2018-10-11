import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import { Hero, SingleDayCard } from '#components';
import { GlobalStoreProps, WeatherStoreProps } from '#stores';
import { MainContent } from './styled';

export interface HomeProps {}

interface InjectedProps extends HomeProps {
  globalStore: GlobalStoreProps;
  weatherStore: WeatherStoreProps;
}

@inject('globalStore', 'weatherStore')
@observer
export class Home extends Component {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  componentDidMount() {
    this.injected.globalStore.init();
  }
  render() {
    const { currentWeek } = this.injected.weatherStore;
    return (
      <Fragment>
        <Hero />
        <MainContent container={true} spacing={24}>
          {currentWeek.map((d: any) => (
            <Grid item={true} key={d.name} sm={true}>
              <SingleDayCard {...d} />
            </Grid>
          ))}
        </MainContent>
      </Fragment>
    );
  }
}
