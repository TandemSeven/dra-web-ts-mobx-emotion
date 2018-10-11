import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import MenuIcon from '@material-ui/icons/Menu';
import moment from 'moment';

import { Forecast, LocationDetails } from '#types';
import { FlexContainer, TypographyFlex } from '#common';
import { primaryTheme } from '#themes';
import {
  GlobalStoreProps,
  LocationStoreProps,
  WeatherStoreProps,
} from '#stores';
import {
  ContentWrapper,
  HeroContainer,
  LeftContent,
  MenuIconButton,
  PaperClasses,
  Region,
  RightContent,
  ShortForecast,
  SVGCurve,
  Temperature,
  TypographyClasses,
} from './styled';

import { forecastIconMap } from '#helpers';

interface InjectedProps extends HeroProps {
  globalStore: GlobalStoreProps;
  locationStore: LocationStoreProps;
  weatherStore: WeatherStoreProps;
}

export interface HeroProps extends Forecast, LocationDetails {}
interface HeroState {
  currentTime: string;
}

@inject('globalStore', 'locationStore', 'weatherStore')
@observer
export class Hero extends Component<HeroProps, HeroState> {
  state: HeroState = {
    currentTime: moment().format('dddd, h:mm A'),
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
  render() {
    const { toggleHamburgerMenu } = this.injected.globalStore;
    const {
      city,
      cityImage = '',
      region,
    } = this.injected.locationStore.locationDetails;
    const { currentWeather } = this.injected.weatherStore;

    const { shortForecast, temperature, icon } = currentWeather;

    return (
      <HeroContainer
        classes={PaperClasses(cityImage)}
        elevation={0}
        square={true}
      >
        <ContentWrapper>
          <LeftContent>
            <FlexContainer>
              {city && (
                <TypographyFlex classes={TypographyClasses}>
                  {`${city},`}
                </TypographyFlex>
              )}
              <Region classes={TypographyClasses}>{region}</Region>
            </FlexContainer>
            <FlexContainer>
              <ShortForecast classes={TypographyClasses}>
                {shortForecast}
              </ShortForecast>
            </FlexContainer>
            <FlexContainer>
              {temperature && (
                <Temperature classes={TypographyClasses}>
                  <sup className="weather-icon">
                    {forecastIconMap(icon || '')}
                  </sup>
                  {temperature}
                  <sup className="degrees">&#8457;</sup>
                </Temperature>
              )}
            </FlexContainer>
          </LeftContent>
          <RightContent>
            <TypographyFlex classes={TypographyClasses}>
              {this.state.currentTime}
            </TypographyFlex>
          </RightContent>
          <MenuIconButton
            aria-label="Open drawer"
            onClick={toggleHamburgerMenu}
          >
            <MenuIcon fontSize="large" />
          </MenuIconButton>
        </ContentWrapper>
        <SVGCurve viewBox="0 0 100 17">
          <path
            fill={primaryTheme.primary.main}
            d="M0 30 V15 Q30 3 60 15 V30z"
          />
          <path
            fill={primaryTheme.surface.main}
            d="M0 30 V12 Q30 17 55 12 T100 11 V30z"
          />
        </SVGCurve>
      </HeroContainer>
    );
  }
}
