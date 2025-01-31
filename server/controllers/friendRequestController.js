import { User, FriendRequest } from "../models/UserModel.js";

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { recipientId, senderId } = req.body;

  

  try {
    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      recipient: recipientId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create new request
    const newRequest = await FriendRequest.create({
      sender: senderId,
      recipient: recipientId,
    });

    res.status(201).json({
      message: "Friend request sent successfully",
      request: newRequest,
    });
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "accepted") {
      return res.status(400).json({ message: "Request already accepted" });
    }

    // Update request status
    request.status = "accepted";
    await request.save();

    // Add each user to the other's friends list
    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.recipient },
    });

    await User.findByIdAndUpdate(request.recipient, {
      $addToSet: { friends: request.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View friends of a user
export const getUserFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate("friends", "name username") // Only get name and username of friends
      .select("friends"); // Only select the friends field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
