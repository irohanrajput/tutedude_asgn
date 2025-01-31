import express from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
} from "../controllers/friendRequestController.js";
import protect from "../middlewares/authenticateMiddleware.js";

const router = express.Router();

router.post("/sendFriendRequest", sendFriendRequest, protect);
router.post("/acceptFriendRequest", acceptFriendRequest, protect);

export default router;
