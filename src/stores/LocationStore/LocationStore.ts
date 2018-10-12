import { action, observable, runInAction } from 'mobx';
import { LocationDetails } from '#types';
import { injectables } from '#router';
import { API_IP_IMAGES, API_IP, ERROR } from '#constants';

export interface LocationStoreProps {
  getByZipCode(zipCode: string): void;
  getCityImage(): void;
  getCurrentLocation(): void;
  locationDetails: LocationDetails;
  updateCityByZip(zipCode: string): void;
}

export class LocationStore {
  @observable
  locationDetails: LocationDetails = {};

  @action
  getByZipCode = async (zipCode: string) => {
    const { globalStore } = injectables;
    try {
      const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`);
      const json = await response.json();

      // error handling
      if (!json.places) {
        return globalStore.setError({
          message: 'Please enter a valid zip code.',
        });
      }

      runInAction('Get by zip code', () => {
        const final = json.places[0];
        const { latitude, longitude, state } = final;

        this.locationDetails = {
          city: final['place name'],
          lat: parseFloat(latitude),
          lon: parseFloat(longitude),
          region: final['state abbreviation'],
          regionName: state,
        };
      });

      globalStore.toggleHamburgerMenu();
    } catch (err) {
      return globalStore.setError({
        message: 'Please enter a valid zip code.',
      });
    }
  };

  @action
  getCurrentLocation = async () => {
    const { globalStore } = injectables;
    try {
      const response = await fetch(API_IP);
      const { city, region, regionName, lat, lon } = await response.json();

      runInAction('Set location', () => {
        this.locationDetails = {
          city,
          lat,
          lon,
          region,
          regionName,
        };
      });
    } catch (err) {
      globalStore.setError({ message: `Err: ${err}` });
    }
  };

  @action
  getCityImage = async () => {
    const { globalStore } = injectables;
    try {
      const { lat, lon } = this.locationDetails;
      const response = await fetch(
        `${API_IP_IMAGES}/${lat},${lon}/?embed=location:nearest-urban-areas/
        location:nearest-urban-area/ua:images`,
      );
      const json = await response.json();

      // error handling
      if (!json._embedded['location:nearest-urban-areas'][0]) {
        return globalStore.setError({
          message: 'Cannot get the closest city.',
        });
      }

      runInAction('Get city image', () => {
        const cityImage =
          json._embedded['location:nearest-urban-areas'][0]._embedded[
            'location:nearest-urban-area'
          ]._embedded['ua:images'].photos[0].image.web;

        this.locationDetails.cityImage = cityImage;
      });
    } catch (err) {
      return globalStore.setError({
        message: 'Cannot get the closest city.',
      });
    }
  };

  @action
  updateCityByZip = async (zipCode: string) => {
    const { globalStore, weatherStore } = injectables;
    globalStore.setLoading({
      message: 'Loading Current Weather...',
    });

    try {
      await this.getByZipCode(zipCode);
      await this.getCityImage();
      await weatherStore.getHourlyForecast();
      await weatherStore.getDailyForecast();
      runInAction('Weather has been fetched', () => {
        if (globalStore.appState !== ERROR) {
          globalStore.setDone();
        }
      });
    } catch (err) {
      globalStore.setError({ message: `Err: ${err}` });
    }
  };
}
