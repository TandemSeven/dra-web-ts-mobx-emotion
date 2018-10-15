export const getForecastDaily = async (forecastUrl: string) => {
  try {
    const response = await fetch(`${forecastUrl}`);
    const { properties } = await response.json();
    return {
      forecastDaily: properties.periods,
    };
  } catch (error) {
    return { error };
  }
};
