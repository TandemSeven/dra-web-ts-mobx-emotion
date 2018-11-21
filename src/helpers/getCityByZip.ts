import { API_ZIP } from '#constants';

export const getCityByZip = async (zipCode?: string) => {
  try {
    const response = await fetch(`${API_ZIP}/${zipCode}`);
    const json = await response.json();
    const final = json.places[0];
    const { latitude, longitude, state } = final;
    return {
      city: final['place name'],
      lat: parseFloat(latitude),
      lon: parseFloat(longitude),
      region: final['state abbreviation'],
      regionName: state,
    };
  } catch (error) {
    return { error };
  }
};
