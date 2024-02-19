import express from "express";
import { signUp, getUsers, logIn } from "../controllers/function/index.js";
import {
  createQuizFrame,
  getQuestions,
  createQuestion,
  finishQuiz,
  getQuizes,
  checkAccount,
  changeProfilePic,
  personalQuizes,
  profileInfo,
  deleteQuiz,
  changeUsername,
} from "../controllers/Logged_In/index.js";
import { verifyToken } from "../middleWare/auth.js";
export const useRouter = express.Router();
export const loggedRouter = express.Router();

useRouter.get("/", getUsers);
useRouter.post("/signUp", signUp);
useRouter.post("/logIn", logIn);

loggedRouter.post("/verify", verifyToken, checkAccount);
loggedRouter.post("/createQuiz", verifyToken, createQuizFrame);
loggedRouter.post("/getQuestions/:quizId", verifyToken, getQuestions);
loggedRouter.post("/quesMake", verifyToken, createQuestion);
loggedRouter.post("/finishQuiz", verifyToken, finishQuiz);
loggedRouter.get("/loadQuizes", verifyToken, getQuizes);
loggedRouter.patch("/changePic/:userId", verifyToken, changeProfilePic);
loggedRouter.get("/profileQuizes/:profileID", verifyToken, personalQuizes);
loggedRouter.get("/profileInfo/:profileID", verifyToken, profileInfo);
loggedRouter.delete("/deleteQuiz/:quizId", verifyToken, deleteQuiz);
loggedRouter.patch("/changeUsername", verifyToken, changeUsername);
// loggedRouter.post("/draftQuiz", draftQuiz);

// useRouter.get("/profile/:id", getProfile)
// useRouter.get("/checkLogin/:uid", checkLogIn);
// loggedRouter.patch("/",);
// loggedRouter.post("/",);
// loggedRouter.post("/",playpoints);
