import React from 'react';
import { MostlySunny, PartlyCloudy, Rain, Sunny } from '#styles';
import { ShortForecastHash, ShortForecast } from '#types';

export const forecastIconMap = (shortForecast: ShortForecast) => {
  const map: ShortForecastHash = {
    'Chance Rain Showers': <Rain />,
    'Mostly Sunny': <MostlySunny />,
    'Partly Cloudy': <PartlyCloudy />,
    Sunny: <Sunny />,
  };
  return map[shortForecast];
};
