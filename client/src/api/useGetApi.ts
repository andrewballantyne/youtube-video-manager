import * as React from 'react';
import * as _ from 'lodash-es';
import fetchApi from './fetchApi';
import { ApiReadState } from './types';

const useGetApi = <T>(
  apiState: ApiReadState | null
): [T | null, boolean, Error | null] => {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const lastApiStateRef = React.useRef<ApiReadState | null>(null);

  const hasData = !!apiState;
  const canMakeAPICall =
    hasData && !_.isEqual(lastApiStateRef.current, apiState);
  React.useEffect(() => {
    if (canMakeAPICall) {
      lastApiStateRef.current = apiState;
      const { apiPath } = apiState;
      fetchApi<T>(apiPath, 'GET')
        .then((responseData) => {
          setData(responseData);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [apiState, canMakeAPICall]);

  const isLoaded = data !== null || error !== null;
  return [hasData ? data : null, isLoaded, error];
};

export default useGetApi;
