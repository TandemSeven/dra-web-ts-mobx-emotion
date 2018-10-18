import { action, observable, runInAction } from 'mobx';
import { LocationDetails } from '#types';
import { injectables } from '#router';
import { ERROR, HERO_FALLBACK } from '#constants';
import { getCityImage, getLocation, getCityByZip } from '#helpers';

export interface LocationStoreProps {
  clearRecentZipCodes(): void;
  getByZipCode(zipCode: string): void;
  getCurrentCityImage(): void;
  getCurrentLocation(): void;
  locationDetails: LocationDetails;
  recentZipCodes: string[];
  updateCityByZip(zipCode: string): void;
}

const retrievedZipCodes = () => {
  const zipCodes = localStorage.getItem('recentZipCodes');
  return zipCodes ? JSON.parse(zipCodes) : [];
};

export class LocationStore {
  @observable
  locationDetails: LocationDetails = {};
  @observable
  recentZipCodes: any = retrievedZipCodes();

  @action
  clearRecentZipCodes = () => {
    localStorage.removeItem('recentZipCodes');
    this.recentZipCodes = [];
  };

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
        if (!this.recentZipCodes.includes(zipCode)) {
          this.recentZipCodes.push(zipCode);
          localStorage.setItem(
            'recentZipCodes',
            JSON.stringify(this.recentZipCodes),
          );
        }
        this.locationDetails = response;
      });

      globalStore.toggleHamburgerMenu();
      routerStore.push('/');
    } catch (err) {
      console.log(err);
      return globalStore.setError({
        message: 'Error, please try again.',
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

      runInAction('Get city image', () => {
        this.locationDetails.cityImage = cityImage || HERO_FALLBACK;
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
