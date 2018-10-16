import { action, observable, runInAction } from 'mobx';
import { LocationDetails } from '#types';
import { injectables } from '#router';
import { ERROR } from '#constants';
import { getCityImage, getLocation, getCityByZip } from '#helpers';

export interface LocationStoreProps {
  getByZipCode(zipCode: string): void;
  getCurrentCityImage(): void;
  getCurrentLocation(): void;
  locationDetails: LocationDetails;
  updateCityByZip(zipCode: string): void;
}

export class LocationStore {
  @observable
  locationDetails: LocationDetails = {};

  /**
   * @async
   * @function getByZipCode
   * @param {string} zipCode - zip code
   * - Gets & Sets the location details
   */
  @action
  getByZipCode = async (zipCode: string) => {
    const { globalStore, routerStore } = injectables;
    try {
      const response = await getCityByZip(zipCode);

      if (!response || response.error) {
        return globalStore.setError({
          message: 'Please enter a valid zip code.',
        });
      }

      runInAction('Get by zip code', () => {
        this.locationDetails = response;
      });

      globalStore.toggleHamburgerMenu();
      routerStore.push('/');
    } catch (err) {
      return globalStore.setError({
        message: 'Please enter a valid zip code.',
      });
    }
  };

  /**
   * @async
   * @function getCurrentLocation
   * - Gets & Sets the location details based on
   * the users' IP address
   */
  @action
  getCurrentLocation = async () => {
    const { globalStore } = injectables;
    try {
      const response = await getLocation();
      runInAction('Set location', () => {
        this.locationDetails = response;
      });
    } catch (err) {
      globalStore.setError({
        message: 'Cannot get your location. Please refresh the browser.',
      });
    }
  };

  /**
   * @async
   * @function getCurrentCityImage
   * - Gets & Sets the city image
   */
  @action
  getCurrentCityImage = async () => {
    const { globalStore } = injectables;
    const { lat, lon } = this.locationDetails;

    try {
      const { cityImage } = await getCityImage(lat!, lon!);

      if (!cityImage) {
        return globalStore.setError({
          message: 'Cannot get the closest city.',
        });
      }

      runInAction('Get city image', () => {
        this.locationDetails.cityImage = cityImage;
      });
    } catch (err) {
      return globalStore.setError({
        message: 'Cannot get the closest city.',
      });
    }
  };

  /**
   * @async
   * @param {string} zipCode - zipCode
   * @function updateCityByZip
   * - Triggers a promise chain that updates
   * the location and weather based on the zipcode
   * input by the user
   */
  @action
  updateCityByZip = async (zipCode: string) => {
    const { globalStore, weatherStore } = injectables;
    globalStore.setLoading({
      message: 'Loading Current Weather...',
    });

    try {
      await this.getByZipCode(zipCode);
      await this.getCurrentCityImage();
      await weatherStore.getHourlyForecast();
      await weatherStore.getDailyForecast();
      runInAction('Weather has been fetched', () => {
        if (globalStore.appState !== ERROR) {
          globalStore.setDone();
        }
      });
    } catch (err) {
      globalStore.setError({
        message: 'Error fetching data. Please try again.',
      });
    }
  };
}
