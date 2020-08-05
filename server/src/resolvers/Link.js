const postedBy = async (parent, args, context) => {
  return await context.prisma.link.findOne({ where: { id: parent.id }}).postedBy();
};

export default { postedBy };