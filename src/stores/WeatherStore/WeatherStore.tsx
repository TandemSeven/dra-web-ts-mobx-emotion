import { action, observable, runInAction } from 'mobx';
import { Weather } from '#types';
import { injectables } from '#router';

export interface WeatherStoreProps {
  weather: Weather[];
  getCurrentWeather(): void;
}

export class WeatherStore {
  @observable weather: any = [];

  @action
  getCurrentWeather = async () => {
    try {
      injectables.appStore.setLoading({ message: 'Loading Weather...' });

      runInAction('getCurrentWeatherSuccess', () => {
        this.weather = [];
        injectables.appStore.setDone();
      });
    } catch (err) {
      injectables.appStore.setError({ message: `Err: ${err}` });
    }
  }
}
