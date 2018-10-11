import { Paper, Typography } from '@material-ui/core';
import { PaperClassKey } from '@material-ui/core/Paper';
import { TypographyClassKey } from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import styled, { css } from 'react-emotion';

import { primaryTheme } from '#themes';
import { FlexContainer, TypographyFlex } from '#common';

const PaperRoot = (cityImage: string) => css`
  min-height: 36.75rem;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  background: ${`url(${cityImage}) ${primaryTheme.background.main}`};
  background-size: cover;
  background-position: center;
  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${primaryTheme.background.overlay};
  }
`;

const TypographyRoot = css`
  font-size: 2rem;
  color: ${primaryTheme.primary.on};
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
  padding: 4rem 6rem;
  max-height: inherit;
`;

export const SVGCurve = styled.svg`
  background: transparent;
  position: absolute;
  bottom: 0;
`;

export const ShortForecast = styled(TypographyFlex)`
  font-size: 1.25rem;
  margin: 1.25rem 0 0;
`;
export const Temperature = styled(TypographyFlex)`
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
export const Region = styled(TypographyFlex)`
  font-weight: 600;
  margin-left: 0.3125rem;
`;

export const RightContent = styled(FlexContainer)`
  justify-content: flex-end;
  flex: auto;
`;

export const MenuIconButton = styled(IconButton)`
  color: white;
  align-self: self-end;
  margin-top: -3rem;
`;

export const LeftContent = styled(FlexContainer)`
  flex-direction: column;
`;
