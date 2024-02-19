'use client';
import React from 'react';
import WithGQL from '@/hooks/withGQL';
import Header from '@/components/Header';

const Home = (): React.ReactElement => {
  return (
    <WithGQL>
      <div className='container'>
        <Header />
      </div>
    </WithGQL>
  );
};

export default Home;
