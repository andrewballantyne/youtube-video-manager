import { ApiMutateState, DataWithId } from './types';

export const archiveVideo = <D extends DataWithId>(
  data: D
): ApiMutateState<D> => ({
  apiPath: '/archive-video',
  method: 'POST',
  data,
});
