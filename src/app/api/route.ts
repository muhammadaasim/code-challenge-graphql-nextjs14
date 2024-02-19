import { ApolloServer } from '@apollo/server';
import { NextRequest, NextResponse } from 'next/server';
import typeDefs from './schema/schema';
import resolvers from './resolvers/resolvers';
import { machineDataSource, floorsDataSource } from './datassources';
import { machineModel, floorModel } from './models';
import connectDB from './connection/connectDB';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

connectDB();

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req: NextRequest, res: NextResponse) => ({
    req,
    res,
    dataSources: {
      floor: new floorsDataSource({ modelOrCollection: floorModel }),
      machine: new machineDataSource({ modelOrCollection: machineModel }),
    },
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
