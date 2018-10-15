import { API_IP_IMAGES } from '#constants';

export const getCityImage = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${API_IP_IMAGES}/${lat},${lon}/?embed=location:nearest-urban-areas/
      location:nearest-urban-area/ua:images`,
    );
    const json = await response.json();
    return {
      cityImage:
        json._embedded['location:nearest-urban-areas'][0]._embedded[
          'location:nearest-urban-area'
        ]._embedded['ua:images'].photos[0].image.web,
    };
  } catch (error) {
    return { error };
  }
};
