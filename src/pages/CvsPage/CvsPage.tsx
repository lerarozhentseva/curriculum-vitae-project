import { ICv } from '@interfaces/index';
import { CreateEmployeeButton } from '@components/Button';
import { Toast } from '@components/Toast';
import { Filter } from '@components/Filter';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import useCvsPage from '@pages/CvsPage/hooks/useCvsPage';
import { StyledBox } from '@pages/CvsPage/CvsPage.styles';
import CreateCvFormDialog from '@pages/CvsPage/components/CreateCvFormDialog/CreateCvFormDialog';
import isAdmin from '@graphql/user/isAdmin';
import CvsTable from './components/CvsTable/CvsTable';

export interface ICvsCreateResult {
  createCv: ICv;
}

const CvsPage = () => {
  const {
    loading,
    error,
    filteredProjects,
    query,
    onQueryChange,
    isOpen,
    handleClickClose,
    handleClickOpen,
    clearError,
    user
  } = useCvsPage();

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      <StyledBox>
        <Filter query={query} onChange={onQueryChange} />
        <CreateEmployeeButton
          name="CREATE CV"
          sx={{ width: '150px', height: '40px', mr: '35px' }}
          onClick={handleClickOpen}
        />
      </StyledBox>
      <CvsTable cvs={filteredProjects} isLoading={loading} />
      <CreateCvFormDialog isOpen={isOpen} handleClose={handleClickClose} />
    </>
  );
};

export default CvsPage;
