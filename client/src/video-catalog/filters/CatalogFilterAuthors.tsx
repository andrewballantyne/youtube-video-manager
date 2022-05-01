import * as React from 'react';
import {
  SimpleList,
  SimpleListItem,
  Spinner,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Text,
} from '@patternfly/react-core';
import useGetApi from '../../api/useGetApi';
import { VideoAuthorCount } from '../../types';
import { getCatalogAuthorItems } from '../../api/apiReadStates';
import CatalogFilterAuthorSearch from './CatalogFilterAuthorSearch';
import { CatalogAuthorId } from '../types';

type CatalogFilterAuthorsProps = {
  onChange: (authorId: CatalogAuthorId) => void;
  selectedId: CatalogAuthorId;
};

const INITIAL_LIMIT = 10;

const CatalogFilterAuthors: React.FC<CatalogFilterAuthorsProps> = ({
  onChange,
  selectedId,
}) => {
  const [authorsCountStat, loaded, error] = useGetApi<VideoAuthorCount[]>(
    getCatalogAuthorItems()
  );
  const [filteredCatalogItems, setFilteredCatalogItems] = React.useState<
    VideoAuthorCount[] | null
  >(null);
  const [showAll, setShowAll] = React.useState(false);

  if (!loaded) {
    return <Spinner size="sm" />;
  }

  if (!authorsCountStat || error) {
    console.error('Error loading catalog items', authorsCountStat);
    return <div>Could not load Catalog Items.</div>;
  }

  if (authorsCountStat.length === 0) {
    return <Text>No Catalog Authors</Text>;
  }

  const visibleItems = (
    filteredCatalogItems ? filteredCatalogItems : authorsCountStat
  ).slice(0, showAll ? undefined : INITIAL_LIMIT);
  const countTotal = (acc: number, { count }: VideoAuthorCount) => acc + count;
  const visibleCount = visibleItems.reduce(countTotal, 0);
  const totalCount = authorsCountStat.reduce(countTotal, 0);

  return (
    <Stack hasGutter>
      <StackItem>
        <CatalogFilterAuthorSearch
          authorsCountStat={authorsCountStat}
          onFilter={(newCatalogItems) =>
            setFilteredCatalogItems(newCatalogItems)
          }
        />
      </StackItem>
      <StackItem>
        <Split>
          <SplitItem isFilled>{visibleCount} Items</SplitItem>
          {visibleCount !== totalCount && (
            <SplitItem isFilled style={{ textAlign: 'right' }}>
              {totalCount} Total
            </SplitItem>
          )}
        </Split>
        {visibleItems.length > 0 && (
          <SimpleList>
            {visibleItems.map(({ id, name, count }) => (
              <SimpleListItem
                key={id}
                isActive={selectedId === id}
                onClick={() => onChange(id)}
              >
                <span style={{ whiteSpace: 'nowrap' }}>
                  {name} ({count})
                </span>
              </SimpleListItem>
            ))}
            {!showAll && visibleItems.length > INITIAL_LIMIT && (
              <SimpleListItem onClick={() => setShowAll(true)}>
                (Show All)
              </SimpleListItem>
            )}
          </SimpleList>
        )}
      </StackItem>
    </Stack>
  );
};

export default CatalogFilterAuthors;
