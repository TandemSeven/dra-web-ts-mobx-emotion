import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import styled from 'react-emotion';

import { Hero, SingleDayCard } from '#components';
import { AppStoreProps, WeatherStoreProps } from '#stores';

const MainContent = styled(Grid)`
  max-width: 65rem;
  margin: auto;
`;

export interface HomeProps {}

interface InjectedProps extends HomeProps {
  appStore: AppStoreProps;
  weatherStore: WeatherStoreProps;
}

@inject('appStore', 'weatherStore')
@observer
export class Home extends Component {
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  componentDidMount() {
    this.injected.appStore.init();
  }
  render() {
    const { locationDetails } = this.injected.appStore;
    const { forecastHourly, currentWeek } = this.injected.weatherStore;
    return (
      <Fragment>
        <Hero {...locationDetails} {...forecastHourly[0]} />
        <section>
          <MainContent container={true} spacing={24}>
            {currentWeek.map((d: any) => {
              return (
                <Grid item={true} key={d.name} sm={true}>
                  <SingleDayCard {...d} />
                </Grid>
              );
            })}
          </MainContent>
        </section>
      </Fragment>
    );
  }
}
