import mongoose from "mongoose";
const QuizMainSchema = new mongoose.Schema({
  creatorId: Number,
  quizId: String,
  stat: String,
  questions: Number,
});
const QuizQues = new mongoose.Schema({
  creatorId: Number,
  quizId: String,
  quesNumbOrder: String,
  question: String,
  // question: [{ ques: String }],
  answers: [
    {
      answer: String,
      isCorrect: String,
    },
  ],
  type: String,
});
const QuizFront = new mongoose.Schema({
  creatorId: Number,
  quizId: String,
  totalQuestions: String,
  quizName: String,
  description: String,
});
// const QuizSchema1 = new mongoose.Schema({
//   creatorId: Number,
//   quizId: Number,
//   question: String,
//   answers: [
//     {
//       answer: String,
//       isCorrect: { type: Boolean, required: true },
//     },
//   ],
//   type: Number,
// });

// const QuizSchema2 = new mongoose.Schema({
//   creatorId: Number,
//   quizId: Number,
//   question: String,
//   answers: [
//     {
//       answer: String,
//       img: String,
//     },
//   ],
//   type: Number,
// });

// const QuizSchema3 = new mongoose.Schema({
//   creatorId: Number,
//   quizId: Number,
//   question1: String,
//   question2: String,
//   question3: String,
//   answers: [
//     {
//       answer: String,
//       isCorrect: Number,
//     },
//   ],
//   type: Number,
// });
export const QuizQuesModels = mongoose.model("questions", QuizQues);
export const QuizMainModels = mongoose.model("quizes", QuizMainSchema);
export const QuizNameModels = mongoose.model("quizNames", QuizFront);
// export const QuizModels1 = mongoose.model("quizes1", QuizSchema1);
// export const QuizModels2 = mongoose.model("quizes2", QuizSchema2);
// export const QuizModels3 = mongoose.model("quizes3", QuizSchema3);
