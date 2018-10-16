import React, { SFC } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { WeatherWeekDay } from '#types';
import { forecastIconMap } from '#helpers';
import {
  CardClasses,
  Temps,
  TempSecondary,
  TypographyClasses,
  WeatherCard,
} from './styled';

export interface SingleDayCardProps extends WeatherWeekDay {}

export const SingleDayCard: SFC<SingleDayCardProps> = ({
  day,
  name,
  night,
}) => {
  const isToday = moment(new Date()).isSame(day.startTime, 'day');

  return (
    <WeatherCard classes={CardClasses} elevation={0}>
      <Typography
        align="center"
        classes={TypographyClasses(isToday)}
        variant="h6"
      >
        {name}
      </Typography>
      {forecastIconMap(day.icon || '')}
      <Temps>
        <span>
          {day.temperature}
          &#176;
          {day.temperatureUnit}
        </span>
        <TempSecondary>
          {night.temperature}
          &#176;
          {night.temperatureUnit}
        </TempSecondary>
      </Temps>
    </WeatherCard>
  );
};
