import fetchData from '@utilities/fetchData';

const getGeoData = async (
  latitude: string,
  longitude: string,
  apiKey: string,
): Promise<{ results: { components: { country: string } } }> => {
  const data = await fetchData(
    `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}%${longitude}&pretty=1`,
  );
  return data;
};

export default getGeoData;
