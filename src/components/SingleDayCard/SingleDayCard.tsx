import React, { SFC } from 'react';
import Card, { CardClassKey } from '@material-ui/core/Card';
import Typography, { TypographyClassKey } from '@material-ui/core/Typography';
import styled, { css } from 'react-emotion';
import moment from 'moment';

import { WeatherWeekDay } from '#types';
import { forecastIconMap } from '#helpers';
import { primaryTheme } from '#themes';

const CardRoot = css`
  background: transparent;
`;

const CardClasses: { [K in CardClassKey]?: string } = {
  root: CardRoot,
};

const TypographyClasses: (
  isToday: boolean,
) => { [K in TypographyClassKey]?: string } = isToday => ({
  title: TypographyTitle(isToday),
});

const TypographyTitle = (isToday: boolean) => css`
  font-weight: ${isToday ? 600 : 400};
`;

const WeatherCard = styled(Card)`
  display: flex;
  flex-direction: column;
  > svg {
    margin: 0.625rem 0;
  }
`;

const Temps = styled.div`
  text-align: center;
`;

const Temp = styled.span`
  font-weight: 600;
  margin-right: 0.3125rem;
`;

const TempSecondary = styled.span`
  color: ${primaryTheme.primary.light};
`;

export interface SingleDayCardProps extends WeatherWeekDay {}

export const SingleDayCard: SFC<SingleDayCardProps> = ({
  name,
  day,
  night,
}) => {
  const isToday = moment(new Date()).isSame(day.startTime, 'day');

  return (
    <WeatherCard classes={CardClasses} elevation={0}>
      <Typography
        align="center"
        classes={TypographyClasses(isToday)}
        variant="title"
      >
        {name}
      </Typography>
      {forecastIconMap(day.icon)}
      <Temps>
        <Temp>
          {day.temperature}
          &#176;
          {day.temperatureUnit}
        </Temp>
        <TempSecondary>
          {night.temperature}
          &#176;
          {night.temperatureUnit}
        </TempSecondary>
      </Temps>
    </WeatherCard>
  );
};
