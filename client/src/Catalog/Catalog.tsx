import * as React from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import CatalogFilters from './CatalogFilters';
import CatalogView from './CatalogView';
import { CatalogId } from './types';

const Catalog: React.FC = () => {
  const [authorSelections, setAuthorSelections] = React.useState<CatalogId[]>(
    []
  );

  return (
    <Split hasGutter>
      <SplitItem>
        <CatalogFilters
          onAuthorsChange={(catalogId) => setAuthorSelections(catalogId)}
        />
      </SplitItem>
      <SplitItem isFilled>
        <CatalogView catalogSelections={authorSelections} />
      </SplitItem>
    </Split>
  );
};

export default Catalog;
