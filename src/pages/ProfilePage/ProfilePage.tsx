import { useLocation } from 'react-router-dom';
import Header from '@components/Header/Header';
import Breadcrumb from '@components/Breadcrumbs/Breadcrumbs';

const ProfilePage = () => {
  const currentPath = useLocation().pathname;
  return (
    <>
      <Header />
      <Breadcrumb currentPath={currentPath} />
      <h1>Profile Page</h1>
    </>
  );
};

export default ProfilePage;
