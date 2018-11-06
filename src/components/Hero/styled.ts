import { Paper } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import { TypographyClassKey } from '@material-ui/core/Typography';
import styled, { css } from 'react-emotion';

import { FlexContainer, TypographyFlex } from '#common';

const PaperRoot = (cityImage: string) => css`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  background: ${`url(${cityImage})`};
  background-size: cover;
  background-position: center;
  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(1, 1, 1, 0.5);
  }
`;

const TypographyRoot = css`
  font-size: 3rem;
`;

export const PaperClasses: (
  cityImage: string,
) => { [K in PaperClassKey]?: string } = cityImage => ({
  root: PaperRoot(cityImage),
});

export const TypographyClasses: { [K in TypographyClassKey]?: string } = {
  root: TypographyRoot,
};

export const HeroContainer = styled(Paper)`
  max-height: 25rem;
  padding: 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: auto;
  padding: 6rem;
  max-height: inherit;
  @media (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 2rem;
  }
`;

export const SVGCurve = styled.svg`
  background: transparent;
  position: absolute;
  bottom: 0;
  > path:nth-child(1) {
    fill: ${({ theme }) => theme.palette.primary.main};
  }
  > path:nth-child(2) {
    fill: ${({ theme }) => theme.palette.secondary.main};
  }
`;

export const ShortForecast = styled(TypographyFlex)`
  font-size: 1.5rem;
  margin-top: 0;
`;
export const DateTime = styled(ShortForecast)`
  margin-top: 0.625rem;
`;

export const Temperature = styled(TypographyFlex)`
  color: ${({ theme }) => theme.palette.primary.light};
  font-size: 7.5rem;
  font-weight: 400;
  > * {
    margin-top: 3rem;
  }
  .weather-icon {
    margin-top: 1rem;
    display: flex;
  }
  .degrees {
    font-size: 2.25rem;
    font-weight: 200;
  }
`;
export const Region = styled(TypographyFlex)`
  color: ${({ theme }) => theme.palette.primary.light};
  font-weight: 600;
  margin-left: 0.3125rem;
`;

export const RightContent = styled(FlexContainer)`
  justify-content: flex-end;
  flex: auto;
  @media (max-width: 767px) {
    flex: initial;
  }
`;

export const LeftContent = styled(FlexContainer)`
  flex-direction: column;
`;
