'use client';
import React from 'react';
import client from '../services/AppoloClient';
import { ApolloProvider } from '@apollo/client';

interface WithGQLProps {
  children: React.ReactNode;
}

const WithGQL: React.FC<WithGQLProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default WithGQL;
