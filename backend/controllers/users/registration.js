const UsersModel = require("../../models/users/UsersModel");
const createToken = require("../../utils/createToken");
require("dotenv").config();

const userRegistration = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  try {
    const userInfos = {
      email,
      password,
    };

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
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "کاربری با این ایمیل یافت نشد" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "رمز عبور صحیح نمی باشد" });
    }

    const token = await createToken({ user });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "خطایی رخ داد" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
