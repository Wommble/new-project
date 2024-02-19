"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { BACK_URL } from "@/back-end-url";

export const playingQuiz = createContext({});

export const PlayingQuizProvider = ({ children }) => {
  const url = useSearchParams();

  const curURL = url.get("quizId");
  const [allQuestions, setAllQuestions] = useState({});
  const [playQuizInfo, setPlayQuizInfo] = useState({});
  const [totPoints, setTotPoints] = useState(0);
  const [gottenPoint, setGottenPoints] = useState(0);
  const [curQuesNumb, setCurQuesNumb] = useState(1);
  const [checkQues, setCheckQues] = useState();
  const [unfilteredData, setUnfilteredData] = useState([]);
  const [finishPlaying, setFinishPlaying] = useState(false);
  useEffect(() => {
    getQues();
  }, [curURL]);
  useEffect(() => {
    getTotPoints();
  }, [unfilteredData]);

  const getQues = async () => {
    if (curURL) {
      const res = await axios.post(
        `${BACK_URL}/getQuestions/${curURL}`,
        {
          creatorId: Cookies.get("id"),
        },
        {
          headers: {
            "x-access-token": Cookies.get("token"),
          },
        }
      );
      if (res) {
        setUnfilteredData(res.data.data);
        // console.log(res.data.data, "srdftgyuhijuytfrdexcvhj");
      }
    }
  };

  const nextQues = (value) => {
    checkAnswer(value);
    if (curQuesNumb == unfilteredData.length) {
      setFinishPlaying(true);
      alert(" want to finish quiz");
    } else {
      setCurQuesNumb(curQuesNumb + 1);
      console.log(curQuesNumb);
    }
  };

  const getTotPoints = () => {
    if (Cookies.get("id") && unfilteredData) {
      const ymrnegym = [];
      for (let i = 0; i < unfilteredData.length; i++) {
        unfilteredData[i].answers.forEach((element) => {
          if (element.isCorrect !== "false") {
            ymrnegym.push(element.isCorrect);
            setTotPoints(ymrnegym.length);
          }
        });
      }
    }
  };
  const checkAnswer = (value) => {
    let info = 0;
    value.forEach((element) => {
      if (element.isCorrect.toString() == element.chosenAnswer) {
        console.log("yes");
        info += 1;
        console.log(info);
      } else {
        ("nope");
      }
    });
    setGottenPoints(gottenPoint + info);
  };
  const submitForm = (value) => {
    console.log(value, "something");
    setCurQuesNumb(curQuesNumb + 1);
  };
  return (
    <playingQuiz.Provider
      value={{
        submitForm: submitForm,
        setFinishPlaying: setFinishPlaying,
        finishPlaying: finishPlaying,
        nextQues: nextQues,
        setUnfilteredData: setUnfilteredData,
        unfilteredData: unfilteredData,
        playQuizInfo: playQuizInfo,
        totPoints: totPoints,
        gottenPoint: gottenPoint,
        curQuesNumb: curQuesNumb,
        setCheckQues: setCheckQues,
        setCurQuesNumb: setCurQuesNumb,
        setTotPoints: setTotPoints,
        setGottenPoints: setGottenPoints,
      }}>
      {children}
    </playingQuiz.Provider>
  );
};
