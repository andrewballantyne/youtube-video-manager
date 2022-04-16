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
import { CatalogItem } from './types';
import CatalogItemSearch from './CatalogItemSearch';

type CatalogItemsProps = {
  onChange: (catalogIds: string[]) => void;
};

const CatalogItems: React.FC<CatalogItemsProps> = ({ onChange }) => {
  const [catalogItems, loaded, error] = useApi<CatalogItem[]>(getCatalogItems);
  const [filteredCatalogItems, setFilteredCatalogItems] = React.useState<
    CatalogItem[] | null
  >(null);
  const [checkedState, setCheckedState] = React.useState<{
    [key: string]: boolean;
  }>({});

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

  const handleSelection = (checked: boolean, name: string) => {
    const data = {
      ...checkedState,
      [name]: checked,
    };
    setCheckedState(data);
    const checkedItems = Object.keys(data).filter((key) => data[key]);
    onChange(checkedItems);
  };

  const ListItemWrapper = ({
    name,
    count,
    ...props
  }: {
    name: string;
    count: number;
  }) => (
    <ListItem {...props}>
      <Checkbox
        id={name}
        isChecked={checkedState[name] ?? false}
        onChange={(checked) => handleSelection(checked, name)}
        label={`${name} (${count})`}
      />
    </ListItem>
  );

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
            ({ name, count }) => (
              <ListItemWrapper key={name} name={name} count={count} />
            )
          )}
        </List>
      </StackItem>
    </Stack>
  );
};

export default CatalogItems;
