import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import { TypographyClassKey } from '@material-ui/core/Typography';
import styled, { css } from 'react-emotion';
import moment from 'moment';

import { primaryTheme } from '#themes';
import { Forecast, LocationDetails } from '#types';
import { FlexContainer } from '#styles';
import { forecastIconMap } from '#helpers';

const PaperRoot = (cityImage: string) => css`
  min-height: 36.75rem;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  background: ${`url(${cityImage}) #ca800d`};
  :before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(1, 1, 1, 0.3);
  }
`;

const PaperClasses: (
  cityImage: string,
) => { [K in PaperClassKey]?: string } = cityImage => ({
  root: PaperRoot(cityImage),
});

const TypographyRoot = css`
  font-size: 2rem;
  color: ${primaryTheme.primary.on};
`;

const TypographyClasses: { [K in TypographyClassKey]?: string } = {
  root: TypographyRoot,
};

const HeroContainer = styled(Paper)`
  max-height: 25rem;
  padding: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: auto;
  padding: 4rem 6rem;
  max-height: inherit;
`;

const SVGCurve = styled.svg`
  background: transparent;
  position: absolute;
  bottom: 0;
`;

const City = styled(Typography)`
  display: flex;
`;
const Time = styled(Typography)`
  display: flex;
`;
const ShortForecast = styled(Typography)`
  display: flex;
  font-size: 1.25rem;
  margin: 1.25rem 0 0;
`;
const Temperature = styled(Typography)`
  display: flex;
  font-size: 10rem;
  .weather-icon {
    display: flex;
    margin-top: 2rem;
  }
  .degrees {
    font-size: 3.5rem;
    font-weight: 200;
  }
`;
const Region = styled(City)`
  font-weight: 600;
  margin-left: 0.3125rem;
`;

const RightContent = styled(FlexContainer)`
  justify-content: flex-end;
  flex: auto;
`;

const LeftContent = styled(FlexContainer)`
  flex-direction: column;
`;

export interface HeroProps extends Forecast, LocationDetails {}
interface HeroState {
  currentTime: string;
}

const CURRENT_TIME = moment().format('dddd, h:mm A');

export class Hero extends Component<HeroProps, HeroState> {
  state: HeroState = {
    currentTime: CURRENT_TIME,
  };
  componentDidMount = () => {
    setInterval(() => {
      this.setState({
        currentTime: CURRENT_TIME,
      });
    }, 1000);
  };
  render() {
    const {
      city,
      region,
      shortForecast,
      temperature,
      icon,
      cityImage = '',
    } = this.props;
    return (
      <HeroContainer
        classes={PaperClasses(cityImage)}
        elevation={0}
        square={true}
      >
        <ContentWrapper>
          <LeftContent>
            <FlexContainer>
              {city && <City classes={TypographyClasses}>{`${city},`}</City>}
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
                  <sup className="weather-icon">{forecastIconMap(icon)}</sup>
                  {temperature}
                  <sup className="degrees">&#8457;</sup>
                </Temperature>
              )}
            </FlexContainer>
          </LeftContent>
          <RightContent>
            <Time classes={TypographyClasses}>{this.state.currentTime}</Time>
          </RightContent>
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
