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

export default { feed, info, link };