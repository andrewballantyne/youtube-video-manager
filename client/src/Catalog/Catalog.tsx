import * as React from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import CatalogFilters from './CatalogFilters';
import CatalogView from './CatalogView';
import { CatalogAuthorId, CatalogDurationState } from './types';

const Catalog: React.FC = () => {
  const [authorSelection, setAuthorSelection] =
    React.useState<CatalogAuthorId>(null);
  const [durationSelection, setDurationSelection] =
    React.useState<CatalogDurationState>(null);

  return (
    <Split hasGutter>
      <SplitItem>
        <CatalogFilters
          onAuthorsChange={(authorId) => setAuthorSelection(authorId)}
          onDurationChange={(duration) => setDurationSelection(duration)}
          selectedAuthorId={authorSelection}
          selectedDuration={durationSelection}
        />
      </SplitItem>
      <SplitItem isFilled>
        <CatalogView
          selectedAuthorId={authorSelection}
          selectedDuration={durationSelection}
        />
      </SplitItem>
    </Split>
  );
};

export default Catalog;
