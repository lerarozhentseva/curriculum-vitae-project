import { CreateEmployeeButton } from '@components/Button';
import { Toast } from '@components/Toast';
import { Filter } from '@components/Filter';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import isAdmin from '@graphql/user/isAdmin';
import LanguagesTable from './Components/LanguagesTable/LanguagesTable';
import useLanguagesPage from './hooks/useLanguagesPage';
import LanguageFormDialog from './Components/LanguageFormDialog/LanguageFormDialog';
import { StyledBox } from './LanguagesPage.styles';

const LanguagesPage = () => {
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
    filteredLanguages
  } = useLanguagesPage();

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      <StyledBox>
        <Filter query={query} onChange={onQueryChange} />
        {isAdmin(user) && (
          <CreateEmployeeButton
            name="CREATE LANGUAGE"
            sx={{ width: '220px', height: '40px', mr: '35px' }}
            onClick={handleClickOpen}
          />
        )}
      </StyledBox>
      <LanguagesTable languages={filteredLanguages} isLoading={loading} />
      <LanguageFormDialog isOpen={isOpen} handleClose={handleClickClose} />
    </>
  );
};

export default LanguagesPage;
