import { ApolloClient, InMemoryCache } from '@apollo/client';

const client: ApolloClient<unknown> = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
});

export default client;
