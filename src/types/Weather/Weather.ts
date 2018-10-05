import { ReactNode } from 'react';

export interface ForecastHourly {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: ShortForecast;
  detailedForecast: string;
}

export interface IShortForecast {
  Sunny: 'Sunny';
}

export type ShortForecast = keyof IShortForecast;

export type ShortForecastHash = { [K in ShortForecast]: ReactNode };
