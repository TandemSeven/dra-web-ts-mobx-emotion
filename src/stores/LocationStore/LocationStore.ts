import { action, observable, runInAction } from 'mobx';
import { LocationDetails } from '#types';
import { injectables } from '#router';
import { API_IP_IMAGES, API_IP, ERROR } from '#constants';

export interface LocationStoreProps {
  getByZipCode(zipCode: string): void;
  getCityImages(): void;
  getClosestCity(): void;
  getCurrentLocation(): void;
  getImageUrl(): void;
  locationDetails: LocationDetails;
  setCityImage(): void;
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
  getClosestCity = async () => {
    const { globalStore } = injectables;
    try {
      const { lat, lon } = this.locationDetails;
      const response = await fetch(`${API_IP_IMAGES}/${lat},${lon}`);
      const json = await response.json();

      // error handling
      if (!json._embedded['location:nearest-urban-areas'][0]) {
        return globalStore.setError({
          message: 'Cannot get the closest city.',
        });
      }

      runInAction('Get closest city', () => {
        const closestCity =
          json._embedded['location:nearest-urban-areas'][0]._links[
            'location:nearest-urban-area'
          ].href;

        this.locationDetails.closestCity = closestCity;
      });
    } catch (err) {
      return globalStore.setError({
        message: 'Cannot get the closest city.',
      });
    }
  };

  @action
  getImageUrl = async () => {
    const { globalStore } = injectables;
    const { closestCity } = this.locationDetails;
    try {
      // provide a fallback check
      if (!closestCity) {
        await this.getClosestCity();
      }

      const response = await fetch(closestCity!);
      const json = await response.json();

      // error handling
      if (!json._links) {
        return globalStore.setError({
          message: 'Cannot get an image URL.',
        });
      }

      runInAction('Get city image URL', () => {
        const cityImageURL = json._links['ua:images'].href;

        this.locationDetails.cityImageURL = cityImageURL;
      });
    } catch (err) {
      return globalStore.setError({
        message: 'Cannot get an image URL.',
      });
    }
  };

  @action
  setCityImage = async () => {
    const { globalStore } = injectables;
    const { cityImageURL } = this.locationDetails;

    try {
      // provide a fallback check
      if (!cityImageURL) {
        await this.getImageUrl();
      }

      const response = await fetch(cityImageURL!);
      const json = await response.json();

      if (!json.photos) {
        return runInAction('Set blank image', () => {
          this.locationDetails.cityImage = undefined;
        });
      }

      return runInAction('Get city images', () => {
        const cityImage = json.photos[0].image.web;
        this.locationDetails.cityImage = cityImage;
      });
    } catch (err) {
      return globalStore.setError({
        message: 'Cannot get a city image.',
      });
    }
  };

  getCityImages = async () => {
    await this.getClosestCity();
    await this.getImageUrl();
    await this.setCityImage();
  };

  @action
  updateCityByZip = async (zipCode: string) => {
    const { globalStore, weatherStore } = injectables;
    globalStore.setLoading({
      message: 'Loading Current Weather...',
    });

    try {
      await this.getByZipCode(zipCode);
      await this.getCityImages();
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
