import { action, observable, runInAction, computed } from 'mobx';
import moment from 'moment';
import { CurrentEndPoints, Forecast, WeatherWeek } from '#types';
import { injectables } from '#router';
import { API_POINTS } from '#constants';
import _ from 'lodash';

export interface WeatherStoreProps {
  getCurrentEndPoints(): void;
  getDailyForecast(): void;
  getHourlyForecast(): void;
  forecastDaily: Forecast[];
  forecastHourly: Forecast[];
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

  @action
  combineCurrentWeek = () => {
    const temp: any = {};
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
   * @function getCurrentEndPoints
   * - Gets & Sets the endpoints listed for hourly and generic forecasts
   * for easy access
   */
  @action
  getCurrentEndPoints = async () => {
    try {
      const { lat, lon } = injectables.locationStore.locationDetails;
      const response = await fetch(`${API_POINTS}/${lat},${lon}`);
      const json = response.json();
      // initial json
      const rawPoints = await json;
      runInAction('Get Current Endpoints', () => {
        // extract what we need from the response
        const { forecast, forecastHourly } = rawPoints.properties;
        this.currentEndPoints = {
          forecast,
          forecastHourly,
        };
      });
    } catch (err) {
      injectables.appStore.setError({ message: `Err: ${err}` });
    }
  };

  /**
   * @function getHourlyForecast
   * - Gets & Sets the hourly forecast for easy access
   */
  @action
  getHourlyForecast = async () => {
    try {
      await this.getCurrentEndPoints();

      const { forecastHourly } = this.currentEndPoints;
      const response = await fetch(`${forecastHourly}`);
      const json = response.json();
      const rawPoints = await json;

      runInAction('Get Hourly Forecast', () => {
        this.forecastHourly = [...rawPoints.properties.periods];
      });
    } catch (err) {
      injectables.appStore.setError({ message: `Err: ${err}` });
    }
  };
  /**
   * @function getDailyForecast
   * - Gets & Sets the daily forecast for easy access
   */
  @action
  getDailyForecast = async () => {
    try {
      await this.getCurrentEndPoints();

      const { forecast } = this.currentEndPoints;
      const response = await fetch(`${forecast}`);
      const json = response.json();
      const rawPoints = await json;

      runInAction('Get Daily Forecast', () => {
        this.forecastDaily = [...rawPoints.properties.periods];
      });

      this.combineCurrentWeek();
    } catch (err) {
      injectables.appStore.setError({ message: `Err: ${err}` });
    }
  };
}
