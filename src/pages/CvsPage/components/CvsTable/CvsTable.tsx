import { FC } from 'react';
import { ICv } from '@interfaces/index';
import { useSort } from '@hooks/index';
import { AppTable } from '@components/AppTable';
import CvsTableRow from '../CvsTableRow/CvsTableRow';

export interface ICvsTableProps {
  cvs: ICv[];
  isLoading: boolean;
}

const CvsTable: FC<ICvsTableProps> = ({ cvs, isLoading }) => {
  const [sortedCvs, sortingRules, cycleSortingRules, isLoadingSort] = useSort(cvs, 'name');

  const fields: ([keyof ICv, string] | undefined)[] = [
    ['is_template', 'Template'],
    ['name', 'Name'],
    ['description', 'Description'],
    ['user', 'User'],
    ['projects', 'Project'],
    undefined
  ];

  return (
    <AppTable<ICv[]>
      sortingRules={sortingRules}
      cycleSortingRules={cycleSortingRules}
      fields={fields}
      data={sortedCvs}
      isLoading={isLoading}
    >
      {(cv, key) => (
        <CvsTableRow cv={cv} isLoading={isLoading} key={key} isLoadingSort={isLoadingSort} />
      )}
    </AppTable>
  );
};

export default CvsTable;
