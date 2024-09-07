const User = require('../models/Users');


// Create a new user
 createUserService = async(data)=> {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Get a user by ID
 getUserByIdService = async(userId)=> {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}

// Get all users
 getAllUsersService = async()=> {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
}

// Update a user by ID
updateUserService = async (userId, data)=> {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.update(data);
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Delete a user by ID
 deleteUserService = async (userId) =>{
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        return { message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

module.exports = {
    createUserService,
    getUserByIdService,
    getAllUsersService,
    updateUserService,
    deleteUserService,
};
