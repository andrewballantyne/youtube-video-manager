import * as React from 'react';
import { Stack, StackItem, Title } from '@patternfly/react-core';
import { CatalogAuthorId, CatalogDurationState } from './types';
import CatalogFilterAuthors from './filters/CatalogFilterAuthors';
import CatalogFilterDuration from './filters/CatalogFilterDuration';

type CatalogItemsProps = {
  onAuthorsChange: (authorId: CatalogAuthorId) => void;
  selectedAuthorId: CatalogAuthorId;

  onDurationChange: (duration: CatalogDurationState) => void;
  selectedDuration: CatalogDurationState;
};

const CatalogFilters: React.FC<CatalogItemsProps> = ({
  onAuthorsChange,
  onDurationChange,
  selectedAuthorId,
  selectedDuration,
}) => {
  return (
    <Stack hasGutter>
      <StackItem>
        <Title headingLevel="h3">Duration</Title>
        <CatalogFilterDuration
          onDurationChange={onDurationChange}
          selectedDuration={selectedDuration}
        />
      </StackItem>
      <StackItem>
        <Title headingLevel="h3">Content Creators</Title>
        <CatalogFilterAuthors
          onChange={onAuthorsChange}
          selectedId={selectedAuthorId}
        />
      </StackItem>
    </Stack>
  );
};

export default CatalogFilters;
