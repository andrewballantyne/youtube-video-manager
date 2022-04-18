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
import CatalogItemActions from './CatalogItemActions';

type CatalogItemProps = {
  video: VideoKind;
};

const CatalogItem: React.FC<CatalogItemProps> = ({ video }) => {
  const { imgId, title, duration } = video;
  return (
    <Split hasGutter>
      <SplitItem>
        <ImageFromId id={imgId} />
      </SplitItem>
      <SplitItem isFilled>
        <Stack>
          <StackItem>
            <Title headingLevel="h3">{title}</Title>
          </StackItem>
          <StackItem>{duration}</StackItem>
        </Stack>
      </SplitItem>
      <SplitItem>
        <CatalogItemActions video={video} />
      </SplitItem>
    </Split>
  );
};

export default CatalogItem;
