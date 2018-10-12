import Card, { CardClassKey } from '@material-ui/core/Card';
import { TypographyClassKey } from '@material-ui/core/Typography';
import styled, { css } from 'react-emotion';

const CardRoot = css`
  background: transparent;
`;

const TypographyTitle = (isToday: boolean) => css`
  font-weight: ${isToday ? 600 : 400};
`;

export const CardClasses: { [K in CardClassKey]?: string } = {
  root: CardRoot,
};

export const TypographyClasses: (
  isToday: boolean,
) => { [K in TypographyClassKey]?: string } = isToday => ({
  title: TypographyTitle(isToday),
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
`;

export const TempSecondary = styled.span`
  font-weight: 600;
  margin-left: 0.3125rem;
`;
