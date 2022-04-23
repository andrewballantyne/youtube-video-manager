import * as React from 'react';
import {
  Bullseye,
  Button,
  Label,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import UsingAuthor from '../../converters/UsingAuthor';
import { plural } from '../../utils/lang';
import { AuthorId, VideoKind } from '../../types';

type CatalogItemHeaderProps = {
  filteredVideos: VideoKind[];
  selectedAuthorId: AuthorId;
  videos: VideoKind[];
};

const CatalogItemHeader: React.FC<CatalogItemHeaderProps> = ({
  selectedAuthorId,
  videos,
  filteredVideos,
}) => {
  return (
    <Stack>
      <StackItem>
        <Split hasGutter>
          <SplitItem>
            <Title size="2xl" headingLevel="h2">
              <UsingAuthor
                id={selectedAuthorId}
                render={(author) => <span>{author.name}</span>}
              />{' '}
              {plural('Video', videos.length)}
            </Title>
          </SplitItem>
          <SplitItem>
            <Label variant="filled">
              {filteredVideos.length !== videos.length
                ? `${filteredVideos.length} of `
                : ''}
              {videos.length}
            </Label>
          </SplitItem>
          <SplitItem>
            <Bullseye>
              <UsingAuthor
                id={selectedAuthorId}
                render={(author) => (
                  <Button
                    variant="link"
                    isInline
                    icon={<ExternalLinkAltIcon />}
                    onClick={() => window.open(author.url)}
                  >
                    Channel
                  </Button>
                )}
              />
            </Bullseye>
          </SplitItem>
        </Split>
      </StackItem>
    </Stack>
  );
};

export default CatalogItemHeader;
