import * as React from 'react';
import { CatalogAuthorId } from './types';
import CatalogFilterAuthors from './filters/CatalogFilterAuthors';
import { Text } from '@patternfly/react-core';

type CatalogItemsProps = {
  onAuthorsChange: (authorId: CatalogAuthorId) => void;
  selectedAuthorId: CatalogAuthorId;
};

const CatalogFilters: React.FC<CatalogItemsProps> = ({
  onAuthorsChange,
  selectedAuthorId,
}) => {
  return (
    <>
      <Text>Authors</Text>
      <CatalogFilterAuthors
        onChange={onAuthorsChange}
        selectedId={selectedAuthorId}
      />
    </>
  );
};

export default CatalogFilters;
