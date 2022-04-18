import { ApiReadState } from './types';
import { AuthorId, ImageId } from '../types';

export const getCatalogAuthorItems = (): ApiReadState => ({
  apiPath: '/catalogs',
});

export const getCatalogVideosByAuthorId = (
  authorId: AuthorId
): ApiReadState => ({
  apiPath: `/catalog/${authorId}`,
});

export const getAuthorById = (authorId: AuthorId): ApiReadState => ({
  apiPath: `/author/${authorId}`,
});

export const getImageById = (imageId: ImageId): ApiReadState => ({
  apiPath: `/image/${imageId}`,
});
