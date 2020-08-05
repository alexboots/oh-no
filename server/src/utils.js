import jwt from 'jsonwebtoken';

const getUserId = (context) => {
  try {
    const Authorization = context.request.get('Authorization');

    if(Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const f= jwt.verify(token, process.env.APP_SECRET);
      
      return f.userId;
    }
    
    throw new Error('User not authenticated');
  } catch(error) {
    throw error;
  }
};

export { getUserId };
