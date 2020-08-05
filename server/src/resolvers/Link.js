const postedBy = (parent, args, context) => {
  return context.prisma.link.findOne({ where: { id: parent.id }}).postedBy();
};

export default { postedBy };