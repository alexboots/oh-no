import Apollo from 'apollo-server';
import prismaClient from '@prisma/client';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js';
import Link from './resolvers/Link.js';
import { typeDefs } from './graphql-schema.js'

const { ApolloServer } = Apollo
const { PrismaClient } = prismaClient;

// maybe use aws?
// https://www.prisma.io/docs/guides/deployment/deploying-to-aws-lambda

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
}

const prisma = new PrismaClient();
// const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      // pubsub,
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
