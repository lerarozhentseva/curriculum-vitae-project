import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { DepartmentsQuery } from '@graphql/departments/DepartmentsQuery';
import { PositionsQuery } from '@graphql/positions/PositionsQuery';
import { IDepartment } from '@interfaces/IDepartment';
import { IPosition } from '@interfaces/IPosition';

interface IUseProfileForm {
  departmentsData?: { departments: IDepartment[] };
  positionsData?: { positions: IPosition[] };
  departmentsLoading: boolean;
  positionsLoading: boolean;
  departmentsError?: Error;
  positionsError?: Error;
}

const useProfileData = (): IUseProfileForm => {
  const [departmentsData, setDepartmentsData] = useState<{ departments: IDepartment[] }>();
  const [positionsData, setPositionsData] = useState<{ positions: IPosition[] }>();
  const { loading: departmentsLoading, error: departmentsError } = useQuery<{
    departments: IDepartment[];
  }>(DepartmentsQuery, {
    onCompleted: (data) => setDepartmentsData(data)
  });
  const { loading: positionsLoading, error: positionsError } = useQuery<{ positions: IPosition[] }>(
    PositionsQuery,
    {
      onCompleted: (data) => setPositionsData(data)
    }
  );

  return {
    departmentsData,
    positionsData,
    departmentsLoading,
    positionsLoading,
    departmentsError,
    positionsError
  };
};

export default useProfileData;
