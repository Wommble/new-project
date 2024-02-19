import mongoose from "mongoose";
const UserShema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  id: String,
  profilePic: String,
  quizes: [{ quizId: String }],
});
export const UserModels = mongoose.model("users", UserShema);
