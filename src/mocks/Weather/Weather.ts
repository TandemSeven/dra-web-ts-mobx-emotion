import { Weather } from '#types';

export const weatherFakeData: Weather[] = [
  {
    id: 'skdfjh342k3jh',
    name: 'Morgan Stanley',
    hours: 6,
    location: 'New York',
    discipline: 'UX Design',
  },
  {
    id: 'asdsf9ds9876sdf',
    name: 'JP Morgan',
    hours: 2,
    location: 'New York',
    discipline: 'Sales Support',
  },
];

export const getFakeWeather = async () => {
  const promise = new Promise(resolve => setTimeout(() => resolve(weatherFakeData), 3000));
  return await promise;
};

