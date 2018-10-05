import { CurrentLocationAndWeather } from '#types';

export const fakeWeatherData: CurrentLocationAndWeather[] = [
  {
    city: 'Sharon',
    detailedForecast: '',
    endTime: '2018-10-05T08:00:00-04:00',
    icon: 'https://api.weather.gov/icons/land/day/few?size=small',
    isDaytime: true,
    lat: 42.1109,
    lon: -71.1849,
    name: '',
    number: 1,
    region: 'MA',
    regionName: 'Massachusetts',
    shortForecast: 'Sunny',
    startTime: '2018-10-05T07:00:00-04:00',
    temperature: 57,
    temperatureTrend: null,
    temperatureUnit: 'F',
    windDirection: 'N',
    windSpeed: '7 mph',
  },
];

export const getFakeWeatherAndLocation = async () => {
  console.log('hi?');
  const promise = new Promise(resolve =>
    setTimeout(() => resolve(fakeWeatherData), 3000),
  );
  return await promise;
};
