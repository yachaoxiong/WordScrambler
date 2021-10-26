import { FetchOptions } from '../../interface/FetchOptions';

const fetchJsonData = async (counter: number) => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return await fetch(
    `https://api.hatchways.io/assessment/sentences/${counter}`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default fetchJsonData;
