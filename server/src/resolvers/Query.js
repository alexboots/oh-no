const feed = async (parent, args, context) => {
  console.log('Feed1111111111111')
  return await context.prisma.link.findMany();
};

const info = () => {
  return 'hello world'
}


const link = () => {
  return 'hello world'
}

const getUser = async(parent, args, context) => {
  const user = await context.prisma.user.findOne({ where: { email: args.email }});
  return user;
};

export default { feed, info, link, getUser };