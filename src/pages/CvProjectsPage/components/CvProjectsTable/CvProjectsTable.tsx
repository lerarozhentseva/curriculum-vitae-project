import { FC, useCallback } from 'react';
import { LinearProgress } from '@mui/material';
import { useMutation } from '@apollo/client';
import { AppTable } from '@components/AppTable';
import { useRequest, useSort } from '@hooks/index';
import { CV_PROJECTS_TABLE_FIELDS } from '@pages/CvProjectsPage/utils';
import { CvProjectsTableRow } from '@pages/CvProjectsPage/components/CvProjectsTableRow';
import {
  GetCvQuery,
  IUpdateCvMutationParameters,
  IUpdateCvMutationReturnValue,
  UpdateCvMutation
} from '@graphql/cvs';
import { Toast } from '@components/Toast';
import { ICvProjectsTableProps } from '.';

const CvProjectsTable: FC<ICvProjectsTableProps> = ({ projects, cv, isLoading }) => {
  const [sortedProjects, sortingRules, cycleSortingRules] = useSort(projects, 'name');

  const [updateAction, { loading, error: nativeError }] = useMutation<
    IUpdateCvMutationReturnValue,
    IUpdateCvMutationParameters
  >(UpdateCvMutation, {
    refetchQueries: [{ query: GetCvQuery, variables: { id: cv.id } }, 'GetCv']
  });

  const updateCvProjects = useCallback(
    async (action: (projectsIds: string[]) => string[]) => {
      if (!cv) return;
      const { id: cvId, ...rest } = cv;

      await updateAction({
        variables: {
          id: cvId,
          cv: {
            ...rest,
            projectsIds: action(cv.projectsIds)
          }
        }
      });
    },
    [cv]
  );

  const [updateCvProjectsRequest, error, clearError] = useRequest(updateCvProjects, nativeError);

  return (
    <>
      {loading && <LinearProgress sx={{ position: 'fixed', inset: '0', top: 'unset' }} />}
      <Toast severity="error" message={error} onClose={clearError} />
      <AppTable
        fields={CV_PROJECTS_TABLE_FIELDS}
        isLoading={isLoading}
        data={sortedProjects}
        sortingRules={sortingRules}
        cycleSortingRules={cycleSortingRules}
      >
        {(project, key) => (
          <CvProjectsTableRow
            key={key}
            project={project}
            cv={cv}
            isLoading={isLoading}
            updateProjects={updateCvProjectsRequest}
          />
        )}
      </AppTable>
    </>
  );
};

export default CvProjectsTable;
