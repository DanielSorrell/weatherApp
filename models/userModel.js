const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Location = require("./locationModel").schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  locations: [Location]
});

/**
 * Takes a user email and password and searches for a matching account in the database.
 * @param {String} email - account email 
 * @param {String} password - account password
 * @returns {Object} user - user database object
 */
userSchema.statics.login = async function(email, password) {
  /*
  if(!email || !password){
    throw Error("Email already in use");
  }
  */

  if(!email){
    throw Error("Email must be filled");
  }else if(!password){
    throw Error("Password must be filled");
  }

  const user = await this.findOne({ email });
  if(!user){
    throw Error("Incorrect email");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if(!passwordMatch){
    throw Error("Incorrect password");
  }

  return user;
}

/**
 * Takes a user email and password and creates an account if email is unique in database.
 * @param {String} email - account email 
 * @param {String} password - account password
 * @returns {Object} user - user database object
 */
userSchema.statics.register = async function(email, password) {
  if(!email && !password){
    throw Error("Please fill out all fields");
  } else if(!email){
    throw Error("Email must be filled");
  }else if(!password){
    throw Error("Password must be filled");
  }

  const usedEmail = await this.findOne({ email });
  if(usedEmail){
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ 
    email: email,
    password: hash,
    locations: []
  })
  return user;
}

module.exports = mongoose.model("User", userSchema);
