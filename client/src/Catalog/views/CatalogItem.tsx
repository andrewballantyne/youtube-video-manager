import * as React from 'react';
import { Video } from '../../types';
import { Split, SplitItem, Stack, StackItem } from '@patternfly/react-core';

type CatalogItemProps = {
  data: Video;
};

const CatalogItem: React.FC<CatalogItemProps> = ({
  data: { imgId, title, authorId },
}) => {
  return (
    <Split>
      <SplitItem>{imgId}</SplitItem>
      <SplitItem>
        <Stack>
          <StackItem>{title}</StackItem>
          <StackItem>{authorId}</StackItem>
        </Stack>
      </SplitItem>
    </Split>
  );
};

export default CatalogItem;
