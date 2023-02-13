import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  adress: { type: String, required: true },
  number: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
});

export default mongoose.model("usersbackend", userSchema);
