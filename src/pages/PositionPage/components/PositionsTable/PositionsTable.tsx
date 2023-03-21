import { FC } from 'react';
import { IPosition } from '@interfaces/index';
import { useSort } from '@hooks/index';
import { AppTable } from '@components/AppTable';
import PositionsTableRow from '../PositionsTableRow/PositionsTableRow';

export interface IPositionsTableProps {
  positions: IPosition[];
  isLoading: boolean;
}

const PositionsTable: FC<IPositionsTableProps> = ({ positions, isLoading }) => {
  const [sortedPositions, sortingRules, cycleSortingRules, isLoadingSort] = useSort(
    positions,
    'name'
  );

  const fields: ([keyof IPosition, string] | undefined)[] = [['name', 'Position Name'], undefined];

  return (
    <AppTable<IPosition[]>
      sortingRules={sortingRules}
      cycleSortingRules={cycleSortingRules}
      fields={fields}
      data={sortedPositions}
      isLoading={isLoading}
    >
      {(position, key) => (
        <PositionsTableRow
          position={position}
          isLoading={isLoading}
          key={key}
          isLoadingSort={isLoadingSort}
        />
      )}
    </AppTable>
  );
};

export default PositionsTable;
