import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { IProject } from '@graphql/interfaces';
import { Header } from '@components/Header';
import { Breadcrumb } from '@components/Breadcrumbs';
import { ConfirmButton } from '@components/Button';
import { PageLoader } from '@components/PageLoader';
import useProjectDetails from '@pages/ProjectDetailsPage/hooks/useProjectDetails';
import DialogForm from '@pages/ProjectDetailsPage/components/DialogForm/DialogForm';
import {
  StyledPaper,
  StyledNotificationAlert
} from '@pages/ProjectDetailsPage/ProjectDetailsPage.styles';

export interface IProjectResult {
  project: IProject | null;
}

const ProjectDetailsPage: FC = () => {
  const {
    data,
    loading,
    error,
    updateProjectError,
    updateProjectLoading,
    handleClickOpen,
    isOpen,
    handleClickClose,
    userIsAdmin
  } = useProjectDetails();

  return (
    <>
      <Header />
      <Breadcrumb />
      {(loading || updateProjectLoading || error) && <PageLoader />}
      <Box>
        <StyledPaper elevation={3}>
          <Box>
            <Typography variant="h6">Project Name: {data?.project?.name || ''}</Typography>
            <Typography variant="h6">
              Internal Name: {data?.project?.internal_name || ''}
            </Typography>
            <Typography variant="h6">Description: {data?.project?.description || ''}</Typography>
            <Typography variant="h6">Domain: {data?.project?.domain || ''}</Typography>
            <Typography variant="h6">Start date: {data?.project?.start_date || ''}</Typography>
            <Typography variant="h6">End date: {data?.project?.end_date || 'Up to now'}</Typography>
          </Box>
          <ConfirmButton
            sx={{ width: '100px', height: '40px' }}
            onClick={handleClickOpen}
            disabled={!userIsAdmin}
            name="Edit"
          />
          <DialogForm isOpen={isOpen} handleClickClose={handleClickClose} />
        </StyledPaper>
      </Box>
      {updateProjectError && (
        <StyledNotificationAlert severity="error" text={'Something went wrong'} />
      )}
    </>
  );
};

// @ts-ignore
export default ProjectDetailsPage;
