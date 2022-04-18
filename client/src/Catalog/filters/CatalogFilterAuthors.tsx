import * as React from 'react';
import {
  Checkbox,
  List,
  ListItem,
  Spinner,
  Stack,
  StackItem,
  Text,
} from '@patternfly/react-core';
import useApi from '../../api/useApi';
import { VideoAuthorCount } from '../../types';
import { getCatalogItems } from '../../api/apiCallStates';
import CatalogFilterAuthorSearch from './CatalogFilterAuthorSearch';
import { CatalogId } from '../types';

type CatalogFilterAuthorsProps = {
  onChange: (catalogIds: CatalogId[]) => void;
};

type SelectedState = {
  [key: string]: boolean;
};

const CatalogFilterAuthors: React.FC<CatalogFilterAuthorsProps> = ({
  onChange,
}) => {
  const [authorsCountStat, loaded, error] =
    useApi<VideoAuthorCount[]>(getCatalogItems);
  const [filteredCatalogItems, setFilteredCatalogItems] = React.useState<
    VideoAuthorCount[] | null
  >(null);
  const [checkedState, setCheckedState] = React.useState<SelectedState>({});

  if (!loaded) {
    return <Spinner size="sm" />;
  }

  if (!authorsCountStat || error) {
    console.error('Error loading catalog items', authorsCountStat);
    return <div>Could not load Catalog Items.</div>;
  }

  if (authorsCountStat.length === 0) {
    return <Text>No Catalog Items</Text>;
  }

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
        {authorsCountStat.reduce((acc, { count }) => acc + count, 0)} Items
      </StackItem>
      <StackItem>
        <List isPlain>
          {(filteredCatalogItems ? filteredCatalogItems : authorsCountStat).map(
            ({ id, name, count }) => (
              <ListItem key={id}>
                <Checkbox
                  id={id.toString()}
                  label={`${name} (${count})`}
                  isChecked={checkedState[id] ?? false}
                  onChange={(checked) => {
                    const data: SelectedState = {
                      ...checkedState,
                      [id]: checked,
                    };
                    setCheckedState(data);
                    const checkedItems = Object.keys(data)
                      .filter((key) => data[key])
                      .map((id) => parseInt(id));
                    onChange(checkedItems);
                  }}
                />
              </ListItem>
            )
          )}
        </List>
      </StackItem>
    </Stack>
  );
};

export default CatalogFilterAuthors;
