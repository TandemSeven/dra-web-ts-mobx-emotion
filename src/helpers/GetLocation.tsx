export const getLocation = async () => {
  try {
    const response = await fetch('http://ip-api.com/json');
    const { city, region, regionName, lat, lon } = await response.json();
    return {
      city,
      lat,
      lon,
      region,
      regionName,
    };
  } catch (error) {
    return { error };
  }
};
