import fetch from 'node-fetch';

const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);

  return response.json();
};

export default fetchData;