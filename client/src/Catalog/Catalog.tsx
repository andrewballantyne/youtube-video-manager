import * as React from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import CatalogItems from './CatalogItems';
import CatalogView from './CatalogView';

const Catalog: React.FC = () => {
  const [catalogSelection, setCatalogSelection] = React.useState<string[]>([]);

  return (
    <Split hasGutter>
      <SplitItem>
        <CatalogItems
          onChange={(catalogId) => setCatalogSelection(catalogId)}
        />
      </SplitItem>
      <SplitItem isFilled>
        <CatalogView catalogSelection={catalogSelection} />
      </SplitItem>
    </Split>
  );
};

export default Catalog;
