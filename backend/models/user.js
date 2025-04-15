import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  seen: [{ type: String }],
  favorites: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

export default User;
