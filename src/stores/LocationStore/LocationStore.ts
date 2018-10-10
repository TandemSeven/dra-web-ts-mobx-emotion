import { action, observable, runInAction } from 'mobx';
import { LocationDetails } from '#types';
import { injectables } from '#router';
import { API_IP_IMAGES, API_IP } from '#constants';

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
    try {
      const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`);
      const json = await response.json();

      if (!json.places) {
        injectables.globalStore.setError({
          message: 'Please enter a valid zip code',
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

      injectables.globalStore.toggleHamburgerMenu();
    } catch (err) {
      injectables.globalStore.setError({ message: `Err: ${err}` });
    }
  };

  @action
  getCurrentLocation = async () => {
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
      injectables.globalStore.setError({ message: `Err: ${err}` });
    }
  };

  @action
  getClosestCity = async () => {
    try {
      const { lat, lon } = this.locationDetails;
      const response = await fetch(`${API_IP_IMAGES}/${lat},${lon}`);
      const json = await response.json();

      runInAction('Get closest city', () => {
        const closestCity =
          json._embedded['location:nearest-urban-areas'][0]._links[
            'location:nearest-urban-area'
          ].href;

        this.locationDetails.closestCity = closestCity;
      });
    } catch (err) {
      injectables.globalStore.setError({ message: `Err: ${err}` });
    }
  };

  @action
  getImageUrl = async () => {
    const { closestCity } = this.locationDetails;
    try {
      // provide a fallback check
      if (!closestCity) {
        await this.getClosestCity();
      }

      const response = await fetch(closestCity!);
      const json = await response.json();

      runInAction('Get city image URL', () => {
        const cityImageURL = json._links['ua:images'].href;

        this.locationDetails.cityImageURL = cityImageURL;
      });
    } catch (err) {
      injectables.globalStore.setError({ message: `Err: ${err}` });
    }
  };

  @action
  setCityImage = async () => {
    const { cityImageURL } = this.locationDetails;

    try {
      // provide a fallback check
      if (!cityImageURL) {
        await this.getImageUrl();
      }

      const response = await fetch(cityImageURL!);
      const json = await response.json();

      runInAction('Get city images', () => {
        const cityImage = json.photos[0].image.web;

        this.locationDetails.cityImage = cityImage;
      });
    } catch (err) {
      injectables.globalStore.setError({ message: `Err: ${err}` });
    }
  };

  getCityImages = async () => {
    await this.getClosestCity();
    await this.getImageUrl();
    await this.setCityImage();
  };

  updateCityByZip = async (zipCode: string) => {
    injectables.globalStore.setLoading({
      message: 'Loading Current Weather...',
    });

    try {
      await this.getByZipCode(zipCode);
      await this.getCityImages();
      await injectables.weatherStore.getHourlyForecast();
      await injectables.weatherStore.getDailyForecast();
    } catch (err) {
      injectables.globalStore.setError({ message: `Err: ${err}` });
    }
    injectables.globalStore.setDone();
  };
}
