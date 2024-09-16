const User = require('../../models/user-model');
const { generateToken } = require('../../utils/auth');
const { body, validationResult } = require('express-validator');

// Function to add a new user
const addUser = async (req,res) => {
  try {
    const {name,email,phone} = req.body
    const userPayload = { name, email, phone };
    const getUser = await User.findOne({ "email": email });
    if( getUser == null ){
      const newUser = new User(userPayload);
      const savedUser = await newUser.save();
      const token = await createToken(savedUser.id, savedUser.email);
      return token;
    }else{
      return ({"error" : "User is already registered please login"})
    }
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

const loginUser = async (req,res) => {
  try {
    const { email } = req.body
    const getUser = await User.findOne({ email: email });
    if(getUser == null || getUser.email !== email){
      return ({"error":"user is not registered please register first"})
    }

    const token = await createToken(getUser.id, getUser.email);
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
  loginUser
};