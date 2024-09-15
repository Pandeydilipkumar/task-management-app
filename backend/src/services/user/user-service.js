const User = require('../../models/user-model');
const { generateToken } = require('../../utils/auth');
// Function to add a new user
const addUser = async (req,res) => {
  try {
    const {name,email,phone} = req.body
    const userPayload = {
      name,
      email,
      phone
    };
    const newUser = new User(userPayload);
    const savedUser = await newUser.save();
    const token = await createToken(savedUser.id, savedUser.email);
    return token;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

const createToken = async (userid, email) => {
  try {
    const userPayload = {userid,email};
    const token =  await generateToken(userPayload);
    return {'userid' : userid, 'token' : token };
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

// Export the functions
module.exports = {
  addUser,
  getAllUsers,
};