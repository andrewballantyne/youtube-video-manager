import { ApiState } from './types';
import { AuthorId } from '../types';

export const getCatalogAuthorItems: ApiState = {
  apiPath: '/catalogs',
  method: 'GET',
};

export const getCatalogVideosByAuthorId = (authorId: AuthorId): ApiState => ({
  apiPath: `/catalog/${authorId}`,
  method: 'GET',
});

export const getAuthorById = (authorId: AuthorId): ApiState => ({
  apiPath: `/author/${authorId}`,
  method: 'GET',
});
