import * as React from 'react';
import * as _ from 'lodash-es';
import fetchApi from './fetchApi';
import { ApiState } from './types';

const useApi = <T>(
  apiState: ApiState | null
): [T | null, boolean, Error | null] => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const lastApiStateRef = React.useRef<ApiState | null>(null);

  React.useEffect(() => {
    if (apiState && !_.isEqual(lastApiStateRef.current, apiState)) {
      lastApiStateRef.current = apiState;
      const { apiPath, method } = apiState;
      fetchApi<T>(apiPath, method)
        .then((responseData) => {
          setData(responseData);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [apiState]);

  const isLoaded = data !== null || error !== null;
  return [data, isLoaded, error];
};

export default useApi;
