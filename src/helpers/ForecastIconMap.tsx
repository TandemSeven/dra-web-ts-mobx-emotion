import React from 'react';
import { MostlySunny, PartlyCloudy, Sunny } from '#styles';
import { ShortForecastHash, ShortForecast } from '#types';

export const forecastIconMap = (shortForecast: ShortForecast) => {
  const map: ShortForecastHash = {
    'Mostly Sunny': <MostlySunny />,
    'Partly Cloudy': <PartlyCloudy />,
    Sunny: <Sunny />,
  };
  return map[shortForecast];
};
