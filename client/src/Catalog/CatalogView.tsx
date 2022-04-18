import * as React from 'react';
import { EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core';
import YoutubeIcon from '@patternfly/react-icons/dist/esm/icons/youtube-icon';
import useApi from '../api/useApi';
import { getCatalogByName } from '../api/apiCallStates';
import { CatalogId } from './types';
import { Video } from '../types';
import CatalogItem from './views/CatalogItem';

type CatalogViewProps = {
  catalogSelections: CatalogId[];
};

const CatalogView: React.FC<CatalogViewProps> = ({ catalogSelections }) => {
  const [videos] = useApi<Video[]>(
    catalogSelections.length > 0 ? getCatalogByName(catalogSelections) : null
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
        Content
      </Title>
      {videos.map((video) => (
        <CatalogItem key={video.id} data={video} />
      ))}
    </>
  );
};

export default CatalogView;
