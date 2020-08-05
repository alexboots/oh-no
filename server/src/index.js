import graphqlYoga from 'graphql-yoga';
import prismaClient from '@prisma/client';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js';
import Link from './resolvers/Link.js';

const { GraphQLServer } = graphqlYoga;
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
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  }
});

const options = {
  port: process.env.PORT,
}
server.start(options, () => console.log(`Server is running on port ${process.env.PORT}`))
