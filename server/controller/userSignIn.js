const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
try{
const {email, password} = req.body
if (!email) {
    res.json({
      success: false,
      error: true,
      message: "plese enter email again",
    });
    return;
  }

  if (!password) {
    res.json({
      success: false,
      error: true,
      message: "plese enter password",
    });
    return;
  }

  const user = await userModel.findOne({ email });

  if(!user){
    throw new Error("User not found")
  }

  const checkPassword = await bcrypt.compare(password, user.password)
  
  if(checkPassword) {

    const tokenData = {
        _id: user._id,
        email: user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECREAT_KEY, { expiresIn: 60 * 60 });

    const tokenOption = {
        httpOnly: true,
        secure: true
    }

    res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false
    })
  } else {
    throw new Error("Please check password")
  }

} catch(err){
res.json({ message: err.message || err , error: true, success: false });
}
}

module.exports = userSignInController