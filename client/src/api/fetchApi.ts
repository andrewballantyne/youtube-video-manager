import { DataWithId } from './types';

const fetchApi = <T>(
  url: string,
  method: string,
  body?: DataWithId
): Promise<T> => {
  return fetch(`http://localhost:3001${url}`, {
    body: JSON.stringify(body),
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  });
};

export default fetchApi;
