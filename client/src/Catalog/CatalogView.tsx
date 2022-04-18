import * as React from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';
import YoutubeIcon from '@patternfly/react-icons/dist/esm/icons/youtube-icon';
import useApi from '../api/useApi';
import { getCatalogVideosByAuthorId } from '../api/apiCallStates';
import { CatalogAuthorId } from './types';
import { VideoKind } from '../types';
import CatalogItem from './views/CatalogItem';
import AuthorNameFromId from '../converters/AuthorNameFromId';
import { plural } from '../utils/lang';

type CatalogViewProps = {
  selectedAuthorId: CatalogAuthorId;
};

const CatalogView: React.FC<CatalogViewProps> = ({ selectedAuthorId }) => {
  const [videos] = useApi<VideoKind[]>(
    selectedAuthorId ? getCatalogVideosByAuthorId(selectedAuthorId) : null
  );

  if (!videos?.length || selectedAuthorId === null) {
    return (
      <EmptyState>
        <EmptyStateIcon variant="container" component={YoutubeIcon} />
        <Title size="lg" headingLevel="h4">
          Select a Content Creator to see Watch Later Items
        </Title>
      </EmptyState>
    );
  }

  return (
    <Stack hasGutter>
      <StackItem>
        <Title size="2xl" headingLevel="h2">
          <AuthorNameFromId id={selectedAuthorId} />{' '}
          {plural('Video', videos.length)} ({videos.length})
        </Title>
      </StackItem>
      <StackItem>
        {videos.map((video) => (
          <CatalogItem key={video.id} data={video} />
        ))}
      </StackItem>
    </Stack>
  );
};

export default CatalogView;
