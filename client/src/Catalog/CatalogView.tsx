import * as React from 'react';
import {
  Button,
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
import { plural } from '../utils/lang';
import { inDuration } from '../utils/time';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import UsingAuthor from '../converters/UsingAuthor';

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

  const filteredVideos = videos.filter(
    (video) =>
      !selectedDuration ||
      inDuration(selectedDuration.min, selectedDuration.max, video.duration)
  );

  return (
    <Stack hasGutter>
      <StackItem>
        <Title size="2xl" headingLevel="h2">
          <UsingAuthor
            id={selectedAuthorId}
            render={(author) => <span>{author.name}</span>}
          />{' '}
          {plural('Video', videos.length)}{' '}
          <Label variant="filled">
            {filteredVideos.length !== videos.length
              ? `${filteredVideos.length} of `
              : ''}
            {videos.length}
          </Label>{' '}
          <UsingAuthor
            id={selectedAuthorId}
            render={(author) => (
              <Button
                variant="link"
                icon={<ExternalLinkAltIcon />}
                onClick={() => window.open(author.url)}
              >
                Channel
              </Button>
            )}
          />
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
