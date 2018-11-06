import Card, { CardClassKey } from '@material-ui/core/Card';
import { TypographyClassKey } from '@material-ui/core/Typography';
import styled, { css } from 'react-emotion';

const CardRoot = css`
  background: transparent;
`;

const TypographyH6 = (isToday: boolean) => css`
  font-weight: ${isToday ? 600 : 400};
  font-size: 1.5rem;
`;

export const CardClasses: { [K in CardClassKey]?: string } = {
  root: CardRoot,
};

export const TypographyClasses: (
  isToday: boolean,
) => { [K in TypographyClassKey]?: string } = isToday => ({
  h6: TypographyH6(isToday),
});

export const WeatherCard = styled(Card)`
  display: flex;
  flex-direction: column;
  > svg {
    margin: 0.625rem 0;
  }
`;

export const Temps = styled.div`
  text-align: center;
  > span:first-of-type {
    font-weight: 600;
  }
`;

export const TempSecondary = styled.span`
  margin-left: 0.3125rem;
`;
