import { ApiState } from './types';

export const getCatalogItems: ApiState = {
  apiPath: '/catalogs',
  method: 'GET',
};

type GetCatalogByName = (authors: number[]) => ApiState;
export const getCatalogByName: GetCatalogByName = (authorIds) => ({
  apiPath: `/catalog/${authorIds.join(',')}`,
  method: 'GET',
});
