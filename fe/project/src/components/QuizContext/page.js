"use client";
import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BACK_URL } from "@/back-end-url";

export const quizContext = createContext({});

export const QuizProvider = ({ children }) => {
  const number = Cookies.get("quesNumb");
  const [quesNumbContext, setQuesNumbContext] = useState(1);
  const [nameQuiz, setNameQuiz] = useState(false);
  const [quesInfo, setQuesInfo] = useState({});
  const [finishQuizPage, setFinishQuizPage] = useState(false);

  useEffect(() => {
    if (window) {
      setQuesNumbContext(Cookies.get("quesNumb"));
    }
  }, []);

  const sendQuesBE = async (value) => {
    if (Cookies.get("quesNumb") == 10) {
      setFinishQuizPage(true);
    } else {
      value["quesNumbOrder"] = Cookies.get("quesNumb");
      value["creatorId"] = Cookies.get("id");
      value["quizId"] = Cookies.get("quizId");
      const dataValue = value;
      const res = await axios.post(
        `${BACK_URL}/quesMake`,
        {
          data: dataValue,
        },
        {
          headers: {
            "x-access-token": Cookies.get("token"),
          },
        }
      );

      if (res) {
        const num = Cookies.get("quesNumb");
        const curNum = Number(num) + 1;
        Cookies.set("quesNumb", curNum);
        setQuesNumbContext(Number(number) + 1);
      }
    }
  };

  return (
    <quizContext.Provider
      value={{
        quesNumbContext: quesNumbContext,
        quesInfo: quesInfo,
        setQuesInfo: setQuesInfo,
        sendQuesBE: sendQuesBE,
        finishQuizPage: finishQuizPage,
        setFinishQuizPage: setFinishQuizPage,
        nameQuiz: nameQuiz,
        setNameQuiz: setNameQuiz,
      }}>
      {children}
    </quizContext.Provider>
  );
};
