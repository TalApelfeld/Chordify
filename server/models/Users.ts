import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  password: {
    type: Number,
    required: [true, "Password need to be provided !"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
