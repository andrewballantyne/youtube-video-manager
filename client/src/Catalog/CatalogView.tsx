import * as React from 'react';
import {
  EmptyState,
  EmptyStateIcon,
  Label,
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
import AuthorNameFromId from '../converters/AuthorNameFromId';
import { plural } from '../utils/lang';
import { inDuration } from '../utils/time';

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
          Select a Content Creator to see Watch Later Items
        </Title>
      </EmptyState>
    );
  }

  const filteredVideos = videos.filter((video) => {
    if (!selectedDuration) return true;

    return inDuration(
      selectedDuration.min,
      selectedDuration.max,
      video.duration
    );
  });

  return (
    <Stack hasGutter>
      <StackItem>
        <Title size="2xl" headingLevel="h2">
          <AuthorNameFromId id={selectedAuthorId} />{' '}
          {plural('Video', videos.length)}{' '}
          <Label variant="filled">
            {filteredVideos.length !== videos.length
              ? `${filteredVideos.length} of `
              : ''}
            {videos.length}
          </Label>
        </Title>
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
