import * as React from 'react';
import { CatalogId } from './types';
import CatalogFilterAuthors from './filters/CatalogFilterAuthors';
import { Text } from '@patternfly/react-core';

type CatalogItemsProps = {
  onAuthorsChange: (catalogIds: CatalogId[]) => void;
};

const CatalogFilters: React.FC<CatalogItemsProps> = ({ onAuthorsChange }) => {
  return (
    <>
      <Text>Authors</Text>
      <CatalogFilterAuthors onChange={onAuthorsChange} />
    </>
  );
};

export default CatalogFilters;
