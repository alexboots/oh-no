import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { getUserId } from '../utils.js';

import { LINK_ADDED } from './Subscription.js'

const post = async (parent, args, context, info) => {
  const userId = getUserId(context);
  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  });
  // Need to build out frontend, then finish subscription to see new posts
  // pubsub.publish(POST_ADDED, { linkAdded: newLink });
  return newLink;
};

const updateLink = async (parent, args) => {
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
};

const deleteLink = async (parent, args) => {
  const linkIndex = links.findIndex(link => link.id === args.id);
  const deletedLink = links[linkIndex];
  if(linkIndex > -1) {
    links.splice(linkIndex, 1);
  }
  return deletedLink;
};

const signup = async (parent, args, context, info) => {
  console.log('signup');

  try {
    const password = await bcryptjs.hash(args.password, 10);    
    const user = await context.prisma.user.create({ data: { ...args, password } });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      user, 
      token,
    }
  } catch (error) {
    console.error(error);
    if(error.code === 'P2002' && error.meta.target[0] === 'email') {
      throw new Error('This email is already in use. Please login instead.')
    }
    throw new Error('Something went wrong with signup');
  }
};

const login = async (parent, args, context, info) => {
  const errorMessage = 'Email or password was incorrect, or user does not exist.';
  try {
    const user = await context.prisma.user.findOne({ where: { email: args.email } });

      // Same error so people can't fish for users using their email
    if(!user) {
      throw new Error(errorMessage);
    }

    const valid = await bcryptjs.compare(args.password, user.password);
    if(!valid) {
      throw new Error(errorMessage);
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      user,
    }
  } catch(error) {
    console.error(error);
    throw new Error(errorMessage);
  }
};

export default { post, updateLink, deleteLink, signup, login };
