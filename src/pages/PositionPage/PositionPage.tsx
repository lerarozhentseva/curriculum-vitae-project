import { CreateEmployeeButton } from '@components/Button';
import { Toast } from '@components/Toast';
import { Filter } from '@components/Filter';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import isAdmin from '@graphql/user/isAdmin';
import { StyledBox } from './PositionPage.styles';
import PositionsTable from './components/PositionsTable/PositionsTable';
import usePositionsPage from './hooks/usePositionsPage';
import PositionFormDialog from './components/PositionFormDialog/PositionFormDialog';

const PositionPage = () => {
  const {
    loading,
    error,
    query,
    onQueryChange,
    isOpen,
    user,
    handleClickClose,
    handleClickOpen,
    clearError,
    filteredPositions
  } = usePositionsPage();

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      <StyledBox>
        <Filter query={query} onChange={onQueryChange} />
        {isAdmin(user) && (
          <CreateEmployeeButton
            name="CREATE POSITION"
            sx={{ width: '220px', height: '40px', mr: '35px' }}
            onClick={handleClickOpen}
          />
        )}
      </StyledBox>
      <PositionsTable positions={filteredPositions} isLoading={loading} />
      <PositionFormDialog isOpen={isOpen} handleClose={handleClickClose} />
    </>
  );
};

export default PositionPage;
