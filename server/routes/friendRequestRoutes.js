import express from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getUserFriends
} from "../controllers/friendRequestController.js";
import protect from "../middlewares/authenticateMiddleware.js";

const router = express.Router();

router.post("/sendFriendRequest", protect, sendFriendRequest);
router.post("/acceptFriendRequest", protect, acceptFriendRequest);
router.get("/getUserFriends", protect, getUserFriends);


export default router;
