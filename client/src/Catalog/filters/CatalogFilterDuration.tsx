import * as React from 'react';
import { CatalogDurationState } from '../types';
import { SimpleList, SimpleListItem } from '@patternfly/react-core';
import { mts } from '../../utils/time';

type CatalogFilterDurationProps = {
  onDurationChange: (durationState: CatalogDurationState) => void;
  selectedDuration: CatalogDurationState;
};

type RenderDurations = CatalogDurationState & {
  title: string;
};
const DurationSelections: RenderDurations[] = [
  { id: 0, min: 0, max: mts(2), title: 'Less than 2 minutes' },
  { id: 1, min: mts(2) + 1, max: mts(10), title: '2 minutes - 10 minutes' },
  { id: 2, min: mts(10) + 1, max: mts(30), title: '10 minutes - 30 minutes' },
  { id: 3, min: mts(30) + 1, max: mts(60), title: '30 minutes - 60 minutes' },
  { id: 4, min: mts(60) + 1, max: Infinity, title: 'Greater than 60 minutes' },
];

const CatalogFilterDuration: React.FC<CatalogFilterDurationProps> = ({
  selectedDuration,
  onDurationChange,
}) => {
  return (
    <SimpleList>
      <SimpleListItem
        isActive={selectedDuration === null}
        onClick={() => onDurationChange(null)}
      >
        All
      </SimpleListItem>
      {DurationSelections.map(({ id, min, max, title }) => (
        <SimpleListItem
          key={id}
          isActive={selectedDuration?.id === id}
          onClick={() => onDurationChange({ id, min, max })}
        >
          {title}
        </SimpleListItem>
      ))}
    </SimpleList>
  );
};

export default CatalogFilterDuration;
