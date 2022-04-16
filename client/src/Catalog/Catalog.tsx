import * as React from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import CatalogItems from './CatalogItems';
import CatalogView from './CatalogView';
import { CatalogId } from './types';

const Catalog: React.FC = () => {
  const [catalogSelection, setCatalogSelection] = React.useState<CatalogId[]>(
    []
  );

  return (
    <Split hasGutter>
      <SplitItem>
        <CatalogItems
          onChange={(catalogId) => setCatalogSelection(catalogId)}
        />
      </SplitItem>
      <SplitItem isFilled>
        <CatalogView catalogSelections={catalogSelection} />
      </SplitItem>
    </Split>
  );
};

export default Catalog;
