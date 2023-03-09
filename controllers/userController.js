const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * Takes an id and creates a JSON Web Token that expires in 1 day.
 * @param {String} id - database user account id 
 * @returns {Object} JSON Web Token object
 */
const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: "1d"});
};

/**
 * Takes a user defined email and password and attempts logging the user in.
 * @param {Object} req - Request object that contains the email and password
 * @param {Object} res - Response object
 */
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({email, token});
  } catch(error) {
    res.status(400).json({error: error.message});
  }
};

/**
 * Takes a user defined email and password and attempts account registration.
 * @param {Object} req - Request object that contains the email and password
 * @param {Object} res - Response object
 */
const registerUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.register(email, password);
    const token = createToken(user._id);
    res.status(200).json({email, token});
  } catch(error) {
    console.log(error);
    res.status(400).json({error: error.message});
  }
};

module.exports = { loginUser, registerUser };
