import Apollo from 'apollo-server';
import prismaClient from '@prisma/client';

import { resolvers } from './resolvers/index.js';
import { typeDefs }  from './graphql-schema.js'

const { ApolloServer, PubSub } = Apollo
const { PrismaClient } = prismaClient;

// maybe use aws?
// https://www.prisma.io/docs/guides/deployment/deploying-to-aws-lambda

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub,
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
