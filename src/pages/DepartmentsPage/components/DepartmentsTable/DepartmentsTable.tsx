import { FC } from 'react';
import { AppTable } from '@components/AppTable';
import { DepartmentsTableRow } from '@pages/DepartmentsPage/components/DepartmentsTableRow';
import { useSort } from '@hooks/index';
import { IDepartmentsTableProps } from '.';

const DepartmentsTable: FC<IDepartmentsTableProps> = ({ departments, isLoading }) => {
  const [sortedDepartments, sortingRules, cycleSortingRules] = useSort(departments, 'name');

  return (
    <AppTable
      fields={[['name', 'Name'], undefined]}
      data={sortedDepartments}
      sortingRules={sortingRules}
      cycleSortingRules={cycleSortingRules}
      isLoading={isLoading}
    >
      {(department, key) => (
        <DepartmentsTableRow department={department} isLoading={isLoading} key={key} />
      )}
    </AppTable>
  );
};

export default DepartmentsTable;
