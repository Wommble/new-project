"use client";
import { useContext, useState } from "react";
import { TypeOne } from "../../components/QuizQuestions/Type1/page";
import { TypeTwo } from "../../components/QuizQuestions/Type2/page";
import { UpperBar } from "../../components/Homebar/page";
import { TypeThree } from "../../components/QuizQuestions/Type3/page";
import { TypeFour } from "../../components/QuizQuestions/Type4/page";
import Cookies from "js-cookie";
import { quizContext } from "@/components/QuizContext/page";
import { FinQuizPage, FinishQuiz } from "@/components/Finish/page";
import { Unfinished } from "@/components/Unfnished/page";

export default function CreateQuiz() {
  const { quesNumbContext, finishQuizPage, setFinishQuizPage, nameQuiz } =
    useContext(quizContext);
  const [type, setType] = useState("type1");
  const [question, setsQuestion] = useState([]);
  const finQuiz = () => {
    setFinishQuizPage(true);
  };
  return (
    <div>
      {finishQuizPage && <FinQuizPage />}
      <UpperBar />
      {nameQuiz && <FinishQuiz />}
      {!finishQuizPage && !nameQuiz && (
        <div className="fixed bg-[#181818] w-[10%] h-[92%] bottom-0 flex flex-col">
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              console.log(e.target.value);
            }}
            className="bg-pink-800">
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
            <option value="type4">Type 4</option>
          </select>

          <div className="bg-pink-700 overdlow-y-auto w-[85%] m-4">
            {question &&
              question.map((ques) => {
                <div>{ques}</div>;
              })}
          </div>

          <button
            onClick={finQuiz}
            className="absolute bottom-10 ml-5 underline">
            Finish quiz
          </button>
        </div>
      )}
      {(!finishQuizPage && nameQuiz) ||
        (!finishQuizPage && !nameQuiz && (
          <div className="fixed w-[90%] h-[92%] left-[10%] top-[8%] flex flex-col items-center justify-center">
            <div className="fixed top-[100px] undeline text-pink-400">
              Question {quesNumbContext}
            </div>

            {type == "type1" && <TypeOne setType={setType} type={type} />}
            {type == "type2" && <TypeTwo setType={setType} type={type} />}
            {
              type == "type3" && <Unfinished setType={setType} />
              // <TypeThree setType={setType} type={type} />
            }
            {type == "type4" && (
              //  <Unfinished />
              <TypeFour setType={setType} type={type} />
            )}
          </div>
        ))}
    </div>
  );
}
