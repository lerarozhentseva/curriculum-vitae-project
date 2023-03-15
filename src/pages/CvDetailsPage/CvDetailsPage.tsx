import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GetCvQuery } from '@graphql/cvs';
import { Header } from '@components/Header';
import { Breadcrumb } from '@components/Breadcrumbs';
import { ICv } from '@graphql/interfaces';
import { CvUpdateForm } from './components/CvUpdateForm';

const CvDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<{ cv: ICv }>(GetCvQuery, { variables: { id } });

  return (
    <>
      <Header />
      <Breadcrumb />
      {data && <CvUpdateForm cv={data.cv} />}
    </>
  );
};

export default CvDetailsPage;
