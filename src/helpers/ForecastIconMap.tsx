import React from 'react';
import { Sunny } from '#styles';
import { ShortForecastHash, ShortForecast } from '#types';

export const forecastIconMap = (shortForecast: ShortForecast) => {
  const map: ShortForecastHash = {
    Sunny: <Sunny />,
  };
  return map[shortForecast];
};
