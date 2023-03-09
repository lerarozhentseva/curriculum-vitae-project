import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { IProject } from '@graphql/interfaces';
import { Header } from '@components/Header';
import { Breadcrumb } from '@components/Breadcrumbs';
import { ConfirmButton } from '@components/Button';
import { PageLoader } from '@components/PageLoader';
import { NotificationAlert } from '@components/NotificationAlert';
import useProjectDetails from '@pages/ProjectDetailsPage/hooks/useProjectDetails';
import DialogForm from '@pages/ProjectDetailsPage/components/DialogForm';

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
    handleClickClose
  } = useProjectDetails();

  return (
    <>
      <Header />
      <Breadcrumb />
      {(loading || updateProjectLoading || error) && <PageLoader />}
      <Box>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '30px 40px',
            m: '20px 40px'
          }}
        >
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
            name="Edit"
          />
          <DialogForm isOpen={isOpen} handleClickClose={handleClickClose} />
        </Paper>
      </Box>
      {updateProjectError && (
        <NotificationAlert
          sx={{ position: 'fixed', bottom: '10px', left: '10px', width: '300px' }}
          severity="error"
          text={'Something went wrong'}
        />
      )}
    </>
  );
};

// @ts-ignore
export default ProjectDetailsPage;
