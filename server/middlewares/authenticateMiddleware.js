import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {User} from "../models/UserModel.js";

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_LOGIN_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.verified) {
        return res
          .status(403)
          .json({ message: "Please verify your email first" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

export default protect;