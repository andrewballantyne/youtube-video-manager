import * as React from 'react';
import { VideoKind } from '../../types';
import {
  Split,
  SplitItem,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';
import ImageFromId from '../../converters/ImageFromId';

type CatalogItemProps = {
  data: VideoKind;
};

const CatalogItem: React.FC<CatalogItemProps> = ({
  data: { imgId, title, duration },
}) => {
  return (
    <Split hasGutter>
      <SplitItem>
        <ImageFromId id={imgId} />
      </SplitItem>
      <SplitItem>
        <Stack>
          <StackItem>
            <Title headingLevel="h3">{title}</Title>
          </StackItem>
          <StackItem>{duration}</StackItem>
        </Stack>
      </SplitItem>
    </Split>
  );
};

export default CatalogItem;
