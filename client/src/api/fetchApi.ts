const fetchApi = <T>(url: string, method: string): Promise<T> => {
  return fetch(`http://localhost:3001${url}`, { method }).then((res) => {
    return res.json();
  });
};

export default fetchApi;
