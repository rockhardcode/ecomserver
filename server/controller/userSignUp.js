const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ success: false, error: true, message: "User Already exist" });
      return;
    }

    if (!email) {
      res.json({
        success: false,
        error: true,
        message: "plese enter email again",
      });
      return;
    }

    if (!name) {
      res.json({ success: false, error: true, message: "plese enter name" });
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
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      res.json({
        success: false,
        error: true,
        message: "something is wrong",
      });
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created Successfully!",
    });
  } catch (err) {
    res.json({ message: err, error: true, success: false });
  }
}

module.exports = userSignUpController;
