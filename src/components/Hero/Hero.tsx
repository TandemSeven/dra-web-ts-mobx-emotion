import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import { TypographyClassKey } from '@material-ui/core/Typography';
import styled, { css } from 'react-emotion';
import moment from 'moment';

import { primaryTheme } from '#themes';
import { ForecastHourly, LocationDetails } from '#types';
import { FlexContainer } from '#styles';
import { forecastIconMap } from '#helpers';

const PaperRoot = css`
  min-height: 43.75rem;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  background: #ca800d; // temp background
`;

const PaperClasses: { [K in PaperClassKey]?: string } = {
  root: PaperRoot,
};

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
  padding: 6rem;
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

export interface HeroProps extends ForecastHourly, LocationDetails {}

export class Hero extends Component<HeroProps> {
  render() {
    const { city, region, shortForecast, temperature } = this.props;
    console.log(this.props);
    return (
      <HeroContainer classes={PaperClasses} elevation={0} square={true}>
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
              <Temperature classes={TypographyClasses}>
                <sup className="weather-icon">
                  {forecastIconMap(shortForecast)}
                </sup>
                {temperature}
                <sup className="degrees">&#8457;</sup>
              </Temperature>
            </FlexContainer>
          </LeftContent>
          <RightContent>
            <Time classes={TypographyClasses}>
              {moment().format('dddd, h:mm A')}
            </Time>
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
