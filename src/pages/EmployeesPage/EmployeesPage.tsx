import { useLocation } from 'react-router-dom';
import Header from '@components/Header/Header';
import Breadcrumb from '@components/Breadcrumbs/Breadcrumbs';

const EmployeesPage = () => {
  const currentPath = useLocation().pathname;
  return (
    <>
      <Header />
      <Breadcrumb currentPath={currentPath} />
    </>
  );
};

export default EmployeesPage;
