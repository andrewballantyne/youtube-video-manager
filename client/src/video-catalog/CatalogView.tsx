import * as React from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';
import YoutubeIcon from '@patternfly/react-icons/dist/esm/icons/youtube-icon';
import useGetApi from '../api/useGetApi';
import { getCatalogVideosByAuthorId } from '../api/apiReadStates';
import { CatalogAuthorId, CatalogDurationState } from './types';
import { VideoKind } from '../types';
import CatalogItem from './views/CatalogItem';
import { inDuration } from '../utils/time';
import CatalogItemHeader from './views/CatalogItemHeader';

type CatalogViewProps = {
  selectedAuthorId: CatalogAuthorId;
  selectedDuration: CatalogDurationState;
};

const CatalogView: React.FC<CatalogViewProps> = ({
  selectedAuthorId,
  selectedDuration,
}) => {
  const [videos] = useGetApi<VideoKind[]>(
    selectedAuthorId ? getCatalogVideosByAuthorId(selectedAuthorId) : null
  );

  if (!videos?.length || selectedAuthorId === null) {
    return (
      <EmptyState>
        <EmptyStateIcon variant="container" component={YoutubeIcon} />
        <Title size="lg" headingLevel="h4">
          Select a content creator to see associated videos
        </Title>
      </EmptyState>
    );
  }

  const filteredVideos = videos.filter(
    (video) =>
      !selectedDuration ||
      inDuration(selectedDuration.min, selectedDuration.max, video.duration)
  );

  return (
    <Stack hasGutter>
      <StackItem>
        <CatalogItemHeader
          filteredVideos={filteredVideos}
          selectedAuthorId={selectedAuthorId}
          videos={videos}
        />
      </StackItem>
      <StackItem>
        {filteredVideos.map((video) => (
          <CatalogItem key={video.id} video={video} />
        ))}
      </StackItem>
    </Stack>
  );
};

export default CatalogView;
