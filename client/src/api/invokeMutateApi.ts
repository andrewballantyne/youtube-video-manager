import { ApiMutateState } from './types';
import fetchApi from './fetchApi';

const invokeMutateApi = (mutateApi: ApiMutateState<any>) => {
  const { apiPath, method, data } = mutateApi;

  return fetchApi(apiPath, method, data).catch((error) => {
    console.error('error mutating api', error);
    alert('implement toast');
  });
};

export default invokeMutateApi;
