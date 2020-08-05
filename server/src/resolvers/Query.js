const feed = () => async(parent, args, context) => {
  console.log('Feed')
  return context.prisma.link.findMany();
};

export default { feed };