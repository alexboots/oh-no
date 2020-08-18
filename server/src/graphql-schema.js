import Apollo from 'apollo-server';
const { gql } = Apollo;

export const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link!]!
    link(id: ID!): Link
    getUser(email: String!): User
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type Subscription {
    linkAdded: Link
  }

  ################################################################################ 

  type AuthPayload {
    token: String!
    user: User
  }

  type User {
    id: ID!
    name: String
    email: String!
    links: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    postedBy: User
  }
`;
