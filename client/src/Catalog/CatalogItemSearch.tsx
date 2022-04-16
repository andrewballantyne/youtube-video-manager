import * as React from 'react';
import { SearchInput } from '@patternfly/react-core';
import { CatalogItem } from './types';

type CatalogItemSearchProps = {
  catalogItems: CatalogItem[];
  onFilter: (filteredItems: CatalogItem[] | null) => void;
};

const CatalogItemSearch: React.FC<CatalogItemSearchProps> = ({
  catalogItems,
  onFilter,
}) => {
  const [value, setValue] = React.useState<string>('');

  const onSearchUpdate = (newValue: string, forceReset: boolean = false) => {
    setValue(newValue);

    if (forceReset) {
      onFilter(null);
      return;
    }
    if (newValue === '') {
      onFilter(null);
      return;
    }

    onFilter(catalogItems.filter(({ name }) => name.includes(newValue)));
  };

  return (
    <SearchInput
      placeholder="Find by name"
      value={value}
      onChange={(newValue) => onSearchUpdate(newValue)}
      onClear={() => onSearchUpdate('', true)}
    />
  );
};

export default CatalogItemSearch;
