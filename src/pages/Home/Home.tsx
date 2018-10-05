import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Hero } from '#components';

import { AppStoreProps, WeatherStoreProps } from '#stores';
import { inject, observer } from 'mobx-react';
// import { fakeWeatherData } from '#mocks';

const Summary = styled.section``;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 50rem;
  margin: 0 auto;
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
    const { forecastHourly } = this.injected.weatherStore;
    return (
      <Fragment>
        <Hero {...locationDetails} {...forecastHourly[0]} />
        <Summary>
          <ContentWrapper>
            {forecastHourly.map(p => (
              <p key={p.number}>{p.shortForecast}</p>
            ))}
          </ContentWrapper>
        </Summary>
      </Fragment>
    );
  }
}
