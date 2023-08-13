const UserModel = require('../models//user.model')

async function requireAdmin(req, res, next) {
    console.log("abc", req.user)
    const _id = req.user.userId;
    console.log('_id là', _id)
    
    try {
        const user = await UserModel.findById(_id);
        
        if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (user.role === 'admin') {
          next(); 
        } else {
          console.log('Access denied - Admin only');
          res.status(403).json({ message: 'Access denied - Admin only' });
        }
      } catch (error) {
        console.log('Error querying user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

module.exports = requireAdmin;
