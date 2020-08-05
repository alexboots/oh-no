import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { getUserId } from '../utils.js';

const post = (parent, args, context, info) => {
  const userId = getUserId(context);
  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  });
  return newLink;
};

const updateLink = (parent, args) => {
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

const deleteLink = (parent, args) => {
  const linkIndex = links.findIndex(link => link.id === args.id);
  const deletedLink = links[linkIndex];
  if(linkIndex > -1) {
    links.splice(linkIndex, 1);
  }
  return deletedLink;
};

const signup = async (parent, args, context, info) => {
  try {
    const password = await bcryptjs.hash(args.password, 10);    
    const user = await context.prisma.user.create({ data: { ...args, password } });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      user, 
      token,
    }
  } catch (error) {
    throw error;
  }
};

const login = async (parent, args, context, info) => {
  try {
    const user = await context.prisma.user.findOne({ where: { email: args.email } });

      // Same error so people can't fish for users using their email
    const errorMessage = 'Email or password was incorrect';
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
    throw error;
  }
};

export default { post, updateLink, deleteLink, signup, login };
