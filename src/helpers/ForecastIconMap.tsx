import React from 'react';
import {
  Cloudy,
  Cold,
  Fog,
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

export const forecastIconMap = (iconString: string) => {
  const iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;
  const icon = iconRegex.exec(iconString)![2];

  const map: any = {
    bkn: <Cloudy />,
    cold: <Cold />,
    few: <MostlySunny />,
    fog: <Fog />,
    fzra: <Sleet />,
    hot: <Hot />,
    ovc: <Cloudy />,
    rain_showers_hi: <Rain />,
    rain_showers: <Rain />,
    rain_sleet: <Sleet />,
    rain_snow: <Snow />,
    rain: <HeavyRain />,
    sct: <PartlyCloudy />,
    skc: <Sunny />,
    sleet: <Sleet />,
    snow: <Snow />,
    tornado: <Tornado />,
    tsra_hi: <Thunder />,
    tsra_sct: <Thunder />,
    tsra: <Thunder />,
    wind_bkn: <MostlySunny />,
    wind_few: <Cloudy />,
    wind_ovc: <Cloudy />,
    wind_sct: <Cloudy />,
    wind_skc: <MostlySunny />,
  };
  return map[icon];
};
