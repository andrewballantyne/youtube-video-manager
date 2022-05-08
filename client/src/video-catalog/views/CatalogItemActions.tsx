import * as React from 'react';
import { Button, Split, SplitItem } from '@patternfly/react-core';
import { IconSize } from '@patternfly/react-icons';
import ArchiveIcon from '@patternfly/react-icons/dist/js/icons/archive-icon';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import { VideoId, VideoKind } from '../../types';
import invokeMutateApi from '../../api/invokeMutateApi';
import { archiveVideo } from '../../api/apiMutateStates';

type CatalogItemActionsProps = {
  video: VideoKind;
};

const CatalogItemActions: React.FC<CatalogItemActionsProps> = ({ video }) => {
  const { id, url } = video;
  return (
    <Split>
      <SplitItem>
        <Button variant="plain" component="a" href={url} target="_blank">
          <ExternalLinkAltIcon size={IconSize.lg} />
        </Button>
      </SplitItem>
      <SplitItem>
        <Button
          variant="plain"
          onClick={() => invokeMutateApi(archiveVideo<{ id: VideoId }>({ id }))}
        >
          <ArchiveIcon size={IconSize.lg} />
        </Button>
      </SplitItem>
    </Split>
  );
};

export default CatalogItemActions;
