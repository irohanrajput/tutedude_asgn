import jwt from "jsonwebtoken";
import {User} from "../models/UserModel.js";

export const registerUser = async (req, res) => {
  console.log('Register request body:', req.body); // Log incoming request data
  
  let { name, username, password } = req.body;
  console.log('Destructured values:', { name, username, password: '***' }); // Log destructured values (hiding password)
  
  username = username.toLowerCase(); // Convert username to lowercase
  console.log('Lowercase username:', username);
  
  try {
    const existingUser = await User.findOne({ username });
    console.log('Existing user check result:', existingUser ? 'User exists' : 'User not found');

    if (existingUser)
      return res
        .status(400)
        .json({ message: "A User with same username is already registered" });

    const user = await User.create({ name, username, password, });
    console.log('New user created:', { id: user._id, username: user.username });

    res
      .status(201)
      .json({ message: `User registered`, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  console.log('Login request body:', req.body); // Log incoming login request
  
  let { username, password } = req.body;
  console.log('Login attempt for username:', username);
  
  username = username.toLowerCase();
  console.log('Lowercase login username:', username);
  
  try {
    const user = await User.findOne({ username });
    console.log('User lookup result:', user ? 'User found' : 'User not found');

    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordOkay = await user.matchPassword(password);
    console.log('Password check result:', passwordOkay ? 'Valid' : 'Invalid');

    if (!passwordOkay)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_LOGIN_SECRET, {
      expiresIn: "15d",
    });
    console.log('JWT token generated for user:', user._id);

    res.status(200).json({
      message: "logged in successfully",
      accessToken: token,
      userName: user.name,
      userObjectId: user._id,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};