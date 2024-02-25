import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import typeDefs from './schema/schema';
import resolvers from './resolvers/resolvers';
import connectDB from './connection/connectDB';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

connectDB();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };