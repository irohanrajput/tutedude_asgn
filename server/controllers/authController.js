import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

export const registerUser = async (req, res) => {

  let { name, username, password } = req.body;

  username = username.toLowerCase(); // Convert username to lowercase

  try {
    const existingUser = await User.findOne({ username });
    

    if (existingUser)
      return res
        .status(400)
        .json({ message: "A User with same username is already registered" });

    const user = await User.create({ name, username, password });

    res.status(201).json({ message: `User registered`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {

  let { username, password } = req.body;

  username = username.toLowerCase();

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordOkay = await user.matchPassword(password);

    if (!passwordOkay)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_LOGIN_SECRET, {
      expiresIn: "15d",
    });

    res.status(200).json({
      message: "logged in successfully",
      accessToken: token,
      userName: user.name,
      userObjectId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
