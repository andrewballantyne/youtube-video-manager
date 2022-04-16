import * as React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  EmptyState,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import YoutubeIcon from '@patternfly/react-icons/dist/esm/icons/youtube-icon';
import useApi from '../api/useApi';
import { getCatalogByName } from '../api/apiCallStates';
import { Video } from './types';

type CatalogViewProps = {
  catalogSelection: string[];
};

const CatalogView: React.FC<CatalogViewProps> = ({ catalogSelection }) => {
  const [videos] = useApi<Video[]>(
    catalogSelection.length > 0
      ? getCatalogByName(catalogSelection.join(','))
      : null
  );

  if (!videos?.length) {
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
    <>
      <Title size="2xl" headingLevel="h2">
        {catalogSelection.join(', ')} Content
      </Title>
      {videos.map((video) => (
        <Card key={video.id}>
          <CardTitle>{video.title}</CardTitle>
          <CardBody>{video.imgId}</CardBody>
          <CardFooter>{video.duration}</CardFooter>
        </Card>
      ))}
    </>
  );
};

export default CatalogView;
