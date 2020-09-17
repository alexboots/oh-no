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
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    post(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
    postExcuse(s3ImageId: String!, description: String!): Excuse!
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
    excuses: [Excuse!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    postedBy: User
  }

  type Excuse {
    id: ID!
    description: String!
    s3ImageId: String!
    ownedBy: User
  }
`;
