import * as React from 'react';
import { SearchInput } from '@patternfly/react-core';
import { VideoAuthorCount } from '../../types';

type CatalogItemSearchProps = {
  authorsCountStat: VideoAuthorCount[];
  onFilter: (filteredItems: VideoAuthorCount[] | null) => void;
};

const CatalogFilterAuthorSearch: React.FC<CatalogItemSearchProps> = ({
  authorsCountStat,
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

    onFilter(authorsCountStat.filter(({ name }) => name.includes(newValue)));
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

export default CatalogFilterAuthorSearch;
