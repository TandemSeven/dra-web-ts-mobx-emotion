import { API_POINTS } from '#constants';
export const getWeatherEndpoints = async (lat: number, lon: number) => {
  try {
    const response = await fetch(`${API_POINTS}/${lat},${lon}`);
    const json = await response.json();

    const { forecast, forecastHourly } = json.properties;

    return {
      forecastUrl: forecast,
      forecastHourlyUrl: forecastHourly,
    };
  } catch (error) {
    return { error };
  }
};
