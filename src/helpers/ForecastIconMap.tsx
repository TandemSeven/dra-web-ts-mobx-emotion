import React from 'react';
import {
  Cloudy,
  Cold,
  HeavyRain,
  Hot,
  MostlySunny,
  PartlyCloudy,
  Rain,
  Sleet,
  Snow,
  Sunny,
  Thunder,
  Tornado,
} from '#styles';
import { IconHash } from '#types';

export const forecastIconMap = (iconString: string) => {
  const iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;
  const icon = iconRegex.exec(iconString)![2];

  const map: any = {
    skc: <Sunny />,
    few: <MostlySunny />,
    sct: <PartlyCloudy />,
    bkn: <Cloudy />,
    ovc: <Cloudy />,
    wind_skc: <MostlySunny />,
    wind_few: <Cloudy />,
    wind_sct: <Cloudy />,
    wind_bkn: <MostlySunny />,
    wind_ovc: <Cloudy />,
    snow: <Snow />,
    rain_snow: <Snow />,
    rain_sleet: <Sleet />,
    fzra: <Sleet />,
    sleet: <Sleet />,
    rain: <HeavyRain />,
    rain_showers: <Rain />,
    rain_showers_hi: <Rain />,
    tsra: <Thunder />,
    tsra_sct: <Thunder />,
    tsra_hi: <Thunder />,
    tornado: <Tornado />,
    hot: <Hot />,
    cold: <Cold />,
  };
  return map[icon];
};
