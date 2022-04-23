import { AuthorId } from '../types';

export type CatalogAuthorId = AuthorId | null;

export type CatalogDurationState = {
  id: number;
  min: number;
  max: number;
} | null;
