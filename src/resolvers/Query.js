const feed = () => async(parent, args, context) => {
  return context.prisma.link.findMany();
};

export { feed };