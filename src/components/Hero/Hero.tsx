import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

import { Forecast, LocationDetails } from '#types';
import { FlexContainer, TypographyFlex } from '#common';
import { LocationStoreProps, WeatherStoreProps } from '#stores';
import {
  ContentWrapper,
  DateTime,
  HeroContainer,
  LeftContent,
  PaperClasses,
  Region,
  RightContent,
  ShortForecast,
  SVGCurve,
  Temperature,
  TypographyClasses,
} from './styled';

// import { forecastIconMap } from '#helpers/forecastIconMap';
import { css } from 'emotion';

interface InjectedProps extends HeroProps {
  locationStore: LocationStoreProps;
  weatherStore: WeatherStoreProps;
}

export interface HeroProps extends Forecast, LocationDetails {}
interface HeroState {
  currentTime: string;
}

@inject('locationStore', 'weatherStore')
@observer
export class Hero extends Component<HeroProps, HeroState> {
  state: HeroState = {
    currentTime: '',
  };
  get injected(): InjectedProps {
    return this.props as InjectedProps;
  }
  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        currentTime: moment().format('dddd, h:mm A'),
      });
    }, 1000);
  };
  componentWillUnmount() {
    this.setState({
      currentTime: '',
    });
  }
  render() {
    const {
      city,
      cityImage = '',
      region,
    } = this.injected.locationStore.locationDetails;
    const { currentWeather = {} } = this.injected.weatherStore;

    const { shortForecast, temperature, icon } = currentWeather;

    return (
      <HeroContainer
        classes={PaperClasses(cityImage)}
        elevation={0}
        square={true}
      >
        <ContentWrapper>
          <LeftContent>
            <FlexContainer
              className={css`
                @media (max-width: 768px) {
                  justify-items: center;
                }
              `}
            >
              {city && (
                <TypographyFlex classes={TypographyClasses}>
                  {`${city},`}
                </TypographyFlex>
              )}
              <Region classes={TypographyClasses}>{region}</Region>
            </FlexContainer>
            <FlexContainer
              className={css`
                @media (max-width: 768px) {
                  justify-content: center;
                }
              `}
            >
              <ShortForecast classes={TypographyClasses}>
                {shortForecast}
              </ShortForecast>
            </FlexContainer>
            <FlexContainer
              className={css`
                @media (max-width: 768px) {
                  justify-content: center;
                }
              `}
            >
              {temperature && (
                <Temperature classes={TypographyClasses}>
                  <sup className="weather-icon">
                    {/* {forecastIconMap(icon || '')} */}
                  </sup>
                  {temperature}
                  <sup className="degrees">&#8457;</sup>
                </Temperature>
              )}
            </FlexContainer>
          </LeftContent>
          <RightContent>
            <DateTime>{this.state.currentTime}</DateTime>
          </RightContent>
        </ContentWrapper>
        <SVGCurve viewBox="0 0 100 17">
          <path d="M0 30 V15 Q30 3 60 15 V30z" />
          <path d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
        </SVGCurve>
      </HeroContainer>
    );
  }
}
