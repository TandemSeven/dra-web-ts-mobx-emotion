import React from 'react';
import {
  Cloud,
  Cloudy,
  Cloudy1,
  Rain,
  Rain1,
  Rain2,
  Snowflake,
  Snowing1,
  Snowing3,
  Storm,
  Sun,
  Sunset,
  Tornado,
} from '#common';

export const forecastIconMap = (iconString: string) => {
  const iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;
  const icon = iconRegex.exec(iconString)![2];

  const map: any = {
    bkn: <Cloudy1 />,
    blizzard: <Snowflake />,
    cold: <Snowflake />,
    dust: <Tornado />,
    few: <Cloudy1 />,
    fog: <Sunset />,
    fzra: <Snowing1 />,
    haze: <Sunset />,
    hot: <Sun />,
    hurricane: <Tornado />,
    ovc: <Cloudy1 />,
    rain: <Rain />,
    rain_fzra: <Snowing1 />,
    rain_showers: <Rain2 />,
    rain_showers_hi: <Rain1 />,
    rain_snow: <Snowing1 />,
    rain_sleet: <Snowing1 />,
    sct: <Cloudy1 />,
    skc: <Sun />,
    sleet: <Snowing1 />,
    smoke: <Tornado />,
    snow: <Snowing3 />,
    snow_fzra: <Snowing1 />,
    snow_sleet: <Snowing1 />,
    tornado: <Tornado />,
    tropical_storm: <Storm />,
    tsra: <Storm />,
    tsra_sct: <Storm />,
    tsra_hi: <Storm />,
    wind_bkn: <Cloud />,
    wind_ovc: <Cloud />,
    wind_sct: <Cloudy />,
    wind_skc: <Sun />,
    wind_few: <Cloudy />,
  };
  return map[icon];
};
