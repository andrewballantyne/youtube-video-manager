import * as React from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import CatalogFilters from './CatalogFilters';
import CatalogView from './CatalogView';
import { CatalogAuthorId } from './types';

const Catalog: React.FC = () => {
  const [authorSelection, setAuthorSelection] =
    React.useState<CatalogAuthorId>(null);

  return (
    <Split hasGutter>
      <SplitItem>
        <CatalogFilters
          onAuthorsChange={(authorId) => setAuthorSelection(authorId)}
          selectedAuthorId={authorSelection}
        />
      </SplitItem>
      <SplitItem isFilled>
        <CatalogView selectedAuthorId={authorSelection} />
      </SplitItem>
    </Split>
  );
};

export default Catalog;
