import { action, observable, runInAction } from 'mobx';
import { CurrentEndPoints, ForecastHourly } from '#types';
import { injectables } from '#router';
import { API_POINTS } from '#constants';

export interface WeatherStoreProps {
  getCurrentEndPoints(): void;
  getHourlyForecast(): void;
  forecastHourly: ForecastHourly[];
}

export class WeatherStore {
  @observable
  currentEndPoints: CurrentEndPoints = {};
  @observable
  forecastHourly: ForecastHourly[] = [];

  /**
   * @function getCurrentEndPoints
   * - Gets & Sets the endpoints listed for hourly and generic forecasts
   * for easy access
   */
  @action
  getCurrentEndPoints = async () => {
    injectables.appStore.setLoading({ message: 'Loading Current Weather...' });
    try {
      const { lat, lon } = injectables.appStore.locationDetails;
      const response = await fetch(`${API_POINTS}/${lat},${lon}`);
      const json = response.json();
      // initial json
      const rawPoints = await json;
      runInAction('getHourlyForecastSuccess', () => {
        injectables.appStore.setDone();
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

      runInAction(() => {
        this.forecastHourly = [...rawPoints.properties.periods];
      });
    } catch (err) {
      injectables.appStore.setError({ message: `Err: ${err}` });
    }
  };
}
