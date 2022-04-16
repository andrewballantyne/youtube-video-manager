import * as React from 'react';
import useApi from '../api/useApi';
import { getCatalogItems } from '../api/apiCallStates';
import {
  Checkbox,
  List,
  ListItem,
  Spinner,
  Stack,
  StackItem,
  Text,
} from '@patternfly/react-core';
import { CatalogId } from './types';
import CatalogItemSearch from './CatalogItemSearch';
import { VideoAuthorCount } from '../types';

type CatalogItemsProps = {
  onChange: (catalogIds: CatalogId[]) => void;
};

type SelectedState = {
  [key: string]: boolean;
};

const CatalogItems: React.FC<CatalogItemsProps> = ({ onChange }) => {
  const [catalogItems, loaded, error] =
    useApi<VideoAuthorCount[]>(getCatalogItems);
  const [filteredCatalogItems, setFilteredCatalogItems] = React.useState<
    VideoAuthorCount[] | null
  >(null);
  const [checkedState, setCheckedState] = React.useState<SelectedState>({});

  if (!loaded) {
    return <Spinner size="sm" />;
  }

  if (!catalogItems || error) {
    console.error('Error loading catalog items', catalogItems);
    return <div>Could not load Catalog Items.</div>;
  }

  if (catalogItems.length === 0) {
    return <Text>No Catalog Items</Text>;
  }

  return (
    <Stack hasGutter>
      <StackItem>
        <CatalogItemSearch
          catalogItems={catalogItems}
          onFilter={(newCatalogItems) =>
            setFilteredCatalogItems(newCatalogItems)
          }
        />
      </StackItem>
      <StackItem>
        {catalogItems.reduce((acc, { count }) => acc + count, 0)} Items
      </StackItem>
      <StackItem>
        <List isPlain>
          {(filteredCatalogItems ? filteredCatalogItems : catalogItems).map(
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

export default CatalogItems;
