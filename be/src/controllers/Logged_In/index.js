import { trusted } from "mongoose";
import {
  QuizMainModels,
  QuizNameModels,
  QuizQuesModels,
} from "../../../models/quiz_models.js";
import { UserModels } from "../../../models/user_models.js";
export const changeUsername = async (req, res) => {
  const body = req.body;

  await UserModels.findOneAndUpdate(
    { id: body.userId },
    { username: body.newUsername }
  );
};
export const deleteQuiz = async (req, res) => {
  var { quizId } = req.params;
  const quiz = await QuizNameModels.find({ quizId: quizId });
  const creator = await UserModels.find({ id: quiz[0].creatorId });
  creator[0].quizes.forEach(async (element) => {
    if (element.quizId == quizId) {
      await UserModels.findByIdAndUpdate(
        { _id: creator[0]._id },
        { $pull: { quizes: { $in: [element] } } }
      );
    }
  });
  await QuizMainModels.findByIdAndDelete(quizId);
};
export const personalQuizes = async (req, res) => {
  var { profileID } = req.params;
  const allPlayableQuizes = await QuizMainModels.find({ stat: "complete" });
  const userInfo = await UserModels.findOne({ id: profileID });
  const personalQuizes = [];
  console.log(userInfo.quizes.length, "kkkkk");
  if (userInfo.quizes.length == 1 || userInfo.quizes.length == 0) {
    res.status(200).json({
      quizes: "no",
    });
    return;
  }
  allPlayableQuizes.forEach(async (element, index) => {
    if (element.creatorId == profileID) {
      console.log(element);
      const profileInfo = await QuizNameModels.findOne({
        quizId: element._id.toString(),
      });

      personalQuizes.push(profileInfo);
      if (personalQuizes.length == userInfo.quizes.length - 1) {
        res.status(200).json({
          quizes: personalQuizes,
        });
        return;
      } else {
        res.status(200).json({
          quizes: "no",
        });
      }
    } else {
      res.status(200).json({
        quizes: "no",
      });
    }
  });
};
export const profileInfo = async (req, res) => {
  var { profileID } = req.params;
  const profileInfo = await UserModels.findOne({ id: profileID });

  if (profileInfo) {
    res.status(200).json({
      profile: profileInfo,
    });
  }
};
export const changeProfilePic = async (req, res) => {
  const body = req.body;
  var { userId } = req.params;

  await UserModels.findOneAndUpdate(
    { id: userId },
    { profilePic: body.profilePic }
  );

  res.status(200).json({ message: "succes" });
};
export const checkAccount = async (req, res) => {
  const body = req.body;

  const result = await UserModels.findOne({ id: body.id });
  console.log(body.id == result.id);
  if (body.id == result.id) {
    res.status(200).json({
      data: {
        username: result.username,
        quizes: result.quizes,
        profilePic: result.profilePic,
      },
    });
  }
};
export const createQuestion = async (req, res) => {
  const body = req.body;
  const {
    question,
    quesNumbOrder,
    creatorId,
    quizId,
    typeOfQuiz,
    ...rawAnswers
  } = req.body?.data || {};

  const answers = Object.values(rawAnswers);
  const finData = {
    question,
    typeOfQuiz,
    quesNumbOrder,
    creatorId,
    quizId,
    answers,
  };
  console.log(finData.creatorId);
  await QuizQuesModels.create({
    type: finData.typeOfQuiz,
    creatorId: finData.creatorId,
    quizId: finData.quizId,
    quesNumbOrder: finData.quesNumbOrder,
    question: finData.question,
    answers: finData.answers,
  });
  res.status(200).json({ stat: true });
};

export const createQuizFrame = async (req, res) => {
  const body = req.body;

  const check = await QuizMainModels.findOne({ stat: "inprogress" });
  if (body.userId !== check.creatorId) {
    console.log(body.userId);
    const result = await QuizMainModels.create({
      creatorId: body.userId,
      stat: "inprogress",
    });

    res.status(200).json({ status: true, quizId: result._id.toString() });
  }
};

export const getQuestions = async (req, res) => {
  var { quizId } = req.params;
  const body = req.body;
  var curQuizId = "";
  const check = await QuizMainModels.find({ stat: "complete" });

  for (var i = 0; i < check.length; i++) {
    if (check[i]._id.toString() == quizId) {
      curQuizId += check[i]._id.toString();
    }
  }

  const ques = await QuizQuesModels.find({ quizId: curQuizId });
  res.status(200).json({ data: ques });
};

export const finishQuiz = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    await QuizMainModels.findByIdAndUpdate(
      { _id: body.quizId },
      { stat: "complete" }
    );

    const finQuiz = await QuizNameModels.create({
      creatorId: body.creatorId,
      quizId: body.quizId,
      totalQuestions: body.totQues,
      quizName: body.quizName,
      description: body.description,
    });

    await UserModels.findOneAndUpdate(
      {
        id: body.creatorId,
      },
      { $push: { quizes: { quizId: body.quizId } } }
    );

    if (finQuiz) {
      res.status(200).json({ status: true });
    }
  } catch (err) {}
};
export const getQuizes = async (req, res) => {
  const allPlayableQuizes = await QuizMainModels.find({ stat: "complete" });
  const quizes = await Promise.all(
    allPlayableQuizes.map(async (element, index) => {
      const quiz = await QuizNameModels.findOne({
        quizId: element._id.toString(),
      });

      if (quiz !== null && quiz !== undefined) {
        return quiz;
      }
    })
  );

  const allQuizes = quizes.filter(
    (element) => element !== null && element !== undefined
  );

  if (allQuizes) {
    let totQuizes = [];
    const usernames = await Promise.all(
      allQuizes.map(async (element, index) => {
        console.log(element.creatorId.toString(), index);
        const { username } =
          (await UserModels.findOne({
            id: element.creatorId.toString(),
          })) ?? {};
        console.log(username, "_____-", element.creatorId.toString());
        if (username) {
          return username;
        } else if (username == null || !username) {
          console.log("jj");
        }
      })
    );
    console.log(usernames, "_-----------");

    allQuizes.forEach(async (element, index) => {
      if (usernames[index] && usernames[index] !== null) {
        totQuizes.push([element, usernames[index]]);
      }
    });
    console.log(totQuizes);
    res.status(200).json({ quizes: totQuizes });
  }
};
