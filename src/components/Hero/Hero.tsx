import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import styled, { css } from 'react-emotion';

import { primaryTheme } from '#themes';
import { LocationDetails } from '#types';
import { TypographyClassKey } from '@material-ui/core/Typography';

const PaperRoot = css`
  min-height: 32.125rem;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  background: #ca800d; // temp background
`;

const PaperClasses: { [K in PaperClassKey]?: string } = {
  root: PaperRoot,
};

const TypographyRoot = css`
  font-size: 1.5rem;
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
  padding: 2rem;
  max-height: inherit;
`;

const SVGCurve = styled.svg`
  background: transparent;
  position: absolute;
  bottom: 0;
`;

const City = styled(Typography)``;
const Region = styled(City)`
  font-weight: bold;
  margin-left: 0.3125rem;
`;
export interface HeroProps extends LocationDetails {}
export class Hero extends Component<HeroProps> {
  render() {
    const { city, region } = this.props;
    return (
      <HeroContainer classes={PaperClasses} elevation={0} square={true}>
        <ContentWrapper>
          {city && <City classes={TypographyClasses}>{`${city},`}</City>}
          <Region classes={TypographyClasses}>{region}</Region>
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
