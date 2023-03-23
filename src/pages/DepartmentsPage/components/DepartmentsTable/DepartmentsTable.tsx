import { FC } from 'react';
import { DEPARTMENTS_TABLE_FIELDS } from '@pages/DepartmentsPage/utils';
import { DepartmentsTableRow } from '@pages/DepartmentsPage/components/DepartmentsTableRow';
import { AppTable } from '@components/AppTable';
import { useSort } from '@hooks/index';
import { IDepartmentsTableProps } from '.';

const DepartmentsTable: FC<IDepartmentsTableProps> = ({ departments, isLoading }) => {
  const [sortedDepartments, sortingRules, cycleSortingRules] = useSort(departments, 'name');

  return (
    <AppTable
      fields={DEPARTMENTS_TABLE_FIELDS}
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
