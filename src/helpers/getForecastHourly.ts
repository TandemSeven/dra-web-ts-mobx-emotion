export const getForecastHourly = async (forecastHourlyUrl: string) => {
  try {
    const response = await fetch(`${forecastHourlyUrl}`);
    const { properties } = await response.json();
    return {
      forecastHourly: [...properties.periods],
      currentWeather: properties.periods[0],
    };
  } catch (error) {
    return { error };
  }
};
