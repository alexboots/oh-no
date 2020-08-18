import Apollo from 'apollo-server';
import jwt from 'jsonwebtoken';

const { AuthenticationError } = Apollo;

const getUserId = (context) => {
  try {
    const Authorization = context.request.get('Authorization');

    if(Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const user = jwt.verify(token, process.env.APP_SECRET);
      
      return user.userId;
    }

    throw new AuthenticationError('User not authenticated');
  } catch(error) {
    throw error;
  }
};

export { getUserId };
