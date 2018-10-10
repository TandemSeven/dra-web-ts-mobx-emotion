import { ReactNode } from 'react';

export interface Forecast {
  number?: number;
  name?: string;
  startTime?: string;
  endTime?: string;
  isDaytime?: boolean;
  temperature?: number;
  temperatureUnit?: string;
  temperatureTrend?: null;
  windSpeed?: string;
  windDirection?: string;
  icon?: string;
  shortForecast?: string;
  detailedForecast?: string;
}

export interface WeatherWeekDay {
  day: Forecast;
  night: Forecast;
  name: string;
}

export interface WeatherWeek {
  Monday?: WeatherWeekDay;
  Tuesday?: WeatherWeekDay;
  Wednesday?: WeatherWeekDay;
  Thursday?: WeatherWeekDay;
  Friday?: WeatherWeekDay;
  Saturday?: WeatherWeekDay;
  Sunday?: WeatherWeekDay;
}

export interface IIcon {
  skc: string;
  few: string;
  sct: string;
  bkn: string;
  ovc: string;
  wind_skc: string;
  wind_few: string;
  wind_sct: string;
  wind_bkn: string;
  wind_ovc: string;
  snow: string;
  rain_snow: string;
  rain_sleet: string;
  fzra: string;
  sleet: string;
  rain: string;
  rain_showers: string;
  rain_showers_hi: string;
  tsra: string;
  tsra_sct: string;
  tsra_hi: string;
  tornado: string;
  hot: string;
  cold: string;
}

export type Icon = keyof IIcon;

export type IconHash = { [K in Icon]: ReactNode };
