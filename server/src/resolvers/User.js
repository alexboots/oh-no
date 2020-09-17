const links = async (parent, args, context) => {
  const links = await context.prisma.user.findOne({ where: { id: parent.id } }).links();
  return links;
};

const excuses = async (parent, args, context) => {
  const excuses = await context.prisma.user.findOne({ where: { id: parent.id } }).excuses()
  return excuses;
}

export default { links, excuses };