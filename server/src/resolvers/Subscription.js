export const LINK_ADDED = 'LINK_ADDED';

const linkAdded = {
  subscribe: () => pubsub.asyncIterator([LINK_ADDED]),
};

export default { linkAdded };