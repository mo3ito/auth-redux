const UsersModel = require("../../models/users/UsersModel");
const createToken = require("../../utils/createToken");
require("dotenv").config();

const userRegistration = async (req, res) => {
  const { email, password } = req.body;

  try {
    const lowerCaseEmail = email.toLowerCase();
    const userInfos = {
      email: lowerCaseEmail,
      password,
    };

    const isUserRegisterBefore = await UsersModel.findOne({
      email: lowerCaseEmail,
    });

    if (isUserRegisterBefore) {
      return res.status(400).json({
        message: "کاربری با این ایمیل وجود دارد",
      });
    }

    const newUser = new UsersModel(userInfos);
    await newUser.save();
    const token = await createToken({ infos: newUser });
    res.status(200).json({ infos: newUser, token });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await UsersModel.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(400).json({ message: "کاربری با این ایمیل یافت نشد" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "رمز عبور صحیح نمی باشد" });
    }

    const token = await createToken({ infos: user });

    return res.status(200).json({ infos: user, token });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "خطایی رخ داد" });
  }
};

const getCurrentUserInfos = async (req, res) => {
  const id = req.headers.authorization;

  try {
    if (!id) {
      return res.status(400).json({
        message: "هیچ  ارسال نکردید",
      });
    }

    const user = await UsersModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "خطایی رخ داد" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  getCurrentUserInfos,
};
