import { action, observable, runInAction } from 'mobx';
import moment from 'moment';
import { CurrentEndPoints, Forecast, WeatherWeek } from '#types';
import { injectables } from '#router';

import {
  getWeatherEndpoints,
  getForecastHourly,
  getForecastDaily,
} from '#helpers';

export interface WeatherStoreProps {
  getCurrentEndPoints(): void;
  getDailyForecast(): void;
  getHourlyForecast(): void;
  forecastDaily: Forecast[];
  forecastHourly: Forecast[];
  currentWeather: Forecast;
  currentWeek: WeatherWeek[];
}

export class WeatherStore {
  @observable
  currentEndPoints: CurrentEndPoints = {};
  @observable
  forecastHourly: Forecast[] = [];
  @observable
  forecastDaily: Forecast[] = [];
  currentWeek: WeatherWeek[] = [];
  @observable
  currentWeather: Forecast = {};

  /**
   * @async
   * @function combineCurrentWeek
   * - Forms an object with day, night, and name
   */
  @action
  combineCurrentWeek = () => {
    const temp: any = {};
    // clear current week
    this.currentWeek = [];
    this.forecastDaily.map(day => {
      const dayOfWeek: string = moment(day.startTime).format('ddd');
      if (!temp[dayOfWeek]) {
        // create new instance
        temp[dayOfWeek] = {
          name: dayOfWeek,
        };
        // set day/night
        day.isDaytime
          ? (temp[dayOfWeek].day = day)
          : (temp[dayOfWeek].night = day);
      } else {
        day.isDaytime
          ? (temp[dayOfWeek].day = day)
          : (temp[dayOfWeek].night = day);
        this.currentWeek.push(temp[dayOfWeek]);
      }
    });
    runInAction('Set current week', () => {
      this.currentWeek = this.currentWeek;
    });
  };

  /**
   * @async
   * @function getCurrentEndPoints
   * - Gets & Sets the endpoints listed for hourly and generic forecasts
   */
  @action
  getCurrentEndPoints = async () => {
    const { globalStore, locationStore } = injectables;
    try {
      const { lat, lon } = locationStore.locationDetails;
      const { forecastUrl, forecastHourlyUrl } = await getWeatherEndpoints(
        lat!,
        lon!,
      );

      runInAction('Get Current Endpoints', () => {
        this.currentEndPoints = {
          forecastUrl,
          forecastHourlyUrl,
        };
      });
    } catch (err) {
      globalStore.setError({ message: 'Cannot get weather endpoints.' });
    }
  };

  /**
   * @async
   * @function getHourlyForecast
   * - Gets & Sets the hourly forecast
   */
  @action
  getHourlyForecast = async () => {
    const { globalStore } = injectables;
    try {
      await this.getCurrentEndPoints();
      const { forecastHourlyUrl } = this.currentEndPoints;
      const { forecastHourly, currentWeather } = await getForecastHourly(
        forecastHourlyUrl!,
      );

      runInAction('Get Hourly Forecast', () => {
        this.forecastHourly = forecastHourly!;
        this.currentWeather = currentWeather;
      });
    } catch (err) {
      globalStore.setError({
        message: 'Error fetching the hourly forecast. Please try again.',
      });
    }
  };
  /**
   * @function getDailyForecast
   * - Gets & Sets the daily forecast
   */
  @action
  getDailyForecast = async () => {
    const { globalStore } = injectables;
    try {
      await this.getCurrentEndPoints();
      const { forecastUrl } = this.currentEndPoints;
      const { forecastDaily } = await getForecastDaily(forecastUrl!);

      runInAction('Get Daily Forecast', () => {
        this.forecastDaily = forecastDaily;
      });

      this.combineCurrentWeek();
    } catch (err) {
      globalStore.setError({
        message: 'Error fetching the daily forecast. Please try again.',
      });
    }
  };
}
