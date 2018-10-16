import { toJS } from 'mobx';
import { injectables } from '../../router';
import { getCityByZip } from '../../helpers';
import { API_ZIP } from '../../constants';
import nock from 'nock';

jest.useFakeTimers();

describe('LocationStore', () => {
  let store;
  let fakeRequest;
  beforeEach(() => {
    store = injectables.locationStore;
    fakeRequest = () => {
      return Promise.resolve({
        city: 'Tokyo',
        lat: 29.3123,
        lon: -42.5423,
        region: 'Japan',
        regionName: 'Space',
      });
    };
  });
  describe('getByZipCode', () => {
    it('should be called once', () => {
      store.getByZipCode = jest.fn(fakeRequest);
      setImmediate(() => {
        store.getByZipCode('12432');
        expect(store.getByZipCode).toHaveBeenCalledTimes(1);
      });
    });
    it('should have the correct response', () => {
      store.getByZipCode = jest.fn(fakeRequest);
      console.log('STORE', store.locationDetails);
      setImmediate(() => {
        store.getByZipCode('12432');
        console.log('STORE2', store.locationDetails);
        expect(store.getByZipCode).toEqual({
          city: 'Tokyo',
          lat: 29.3123,
          lon: -42.5423,
          region: 'Japan',
          regionName: 'Spsssace',
        });
      });
    });
  });
});
