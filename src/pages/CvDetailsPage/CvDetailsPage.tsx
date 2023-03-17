import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import { GetCvQuery } from '@graphql/cvs';
import { Header } from '@components/Header';
import { Breadcrumb } from '@components/Breadcrumbs';
import { ICv } from '@graphql/interfaces';
import { PageLoader } from '@components/PageLoader';
import { useCompoundError } from '@hooks/index';
import { Toast } from '@components/Toast';
import { CvUpdateForm } from './components/CvUpdateForm';

const CvDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error: nativeError } = useQuery<{ cv: ICv }>(GetCvQuery, {
    variables: { id }
  });

  const { error, clearError } = useCompoundError(nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      {loading ? (
        <PageLoader />
      ) : data ? (
        <CvUpdateForm cv={data.cv} />
      ) : (
        <Typography>Related CV could not be found</Typography>
      )}
    </>
  );
};

export default CvDetailsPage;
