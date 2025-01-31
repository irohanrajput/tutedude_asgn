import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name please"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "provide username please"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password not provided"],
    },
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);



// Hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const generatedSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, generatedSalt);
  next();
});

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get mutual friends
userSchema.methods.getMutualFriends = async function (otherUserId) {
  const otherUser = await this.model("User")
    .findById(otherUserId)
    .select("friends");
  if (!otherUser) return [];

  return this.friends.filter((friendId) =>
    otherUser.friends.includes(friendId)
  );
};

const User = mongoose.model("User", userSchema);
const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export { User, FriendRequest };
