'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import WithGQL from '../../../hooks/withGQL';
import FloorPagePresentation from './FloorPagePresentation';
import { GET_FLOOR_QUERY } from '@/gql/quries/floorQuries';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <WithGQL>
      <PagePresentationContainer id={id} />
    </WithGQL>
  );
};

const PagePresentationContainer = ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(GET_FLOOR_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <FloorPagePresentation data={data} />;
};

export default Page;
