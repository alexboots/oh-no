import graphqlYoga from 'graphql-yoga';
import prismaClient from '@prisma/client';
import { feed } from './resolvers/Query.js';

const { GraphQLServer } = graphqlYoga;
const { PrismaClient } = prismaClient;

// maybe use aws?
// https://www.prisma.io/docs/guides/deployment/deploying-to-aws-lambda

const resolvers = {
  Query: {
    info: () => `This is a yadayada blah`,
    feed,
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        }
      });

      return newLink;
    },
    updateLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      let link = links[linkIndex];
      if(link) {
        const { url, description } = args;
        if(url) {
          link.url = url;
        }

        if(description) {
          link.description = description;
        }
      }
      return link;
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(link => link.id === args.id);
      const deletedLink = links[linkIndex];
      if(linkIndex > -1) {
        links.splice(linkIndex, 1);
      }
      return deletedLink;
    },
  },
}

const prisma = new PrismaClient();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))