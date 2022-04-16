import { ApiState } from './types';
import { CatalogId } from '../Catalog/types';

export const getCatalogItems: ApiState = {
  apiPath: '/catalogs',
  method: 'GET',
};

type GetCatalogByName = (catalogIds: CatalogId[]) => ApiState;
export const getCatalogByName: GetCatalogByName = (authorIds) => ({
  apiPath: `/catalog/${authorIds.join(',')}`,
  method: 'GET',
});
