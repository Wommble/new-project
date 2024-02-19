"use client";
import { useContext, useEffect, useState } from "react";
import { QuizOpt } from "../../components/QuizOpt/page";
import { playingQuiz } from "@/components/PlayingQuizConst/page";
import { PlayQuizt2 } from "@/components/PlayingQuizTypes/Type2/page";
import { PlayQuizt1 } from "@/components/PlayingQuizTypes/Type1/page";
import { FinishedQuiz } from "@/components/finishedQuiz/page";
import { NextQuestionButton } from "@/components/nextButton/page";
import { PlayQuizt4 } from "@/components/PlayingQuizTypes/Type4/page";

export default function Play() {
  const { finishPlaying } = useContext(playingQuiz);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
      {!finishPlaying && <PlayingQuiz />}
      {finishPlaying && <FinishedQuiz />}
    </div>
  );
}
const PlayingQuiz = () => {
  const { unfilteredData } = useContext(playingQuiz);

  const { curQuesNumb } = useContext(playingQuiz);
  const { nextQues } = useContext(playingQuiz);

  return (
    <div className="flex flex-col items-center gap-10">
      <QuizOpt></QuizOpt>
      <div className="flex flex-col border-2 bg-[#c0345f] h-[] w-[100vw] items-center  gap-[5vh] py-[8vh]">
        <p className="text-xl underline">question {curQuesNumb} </p>
        {curQuesNumb && (
          <p className="text-6xl text-center">
            {unfilteredData[curQuesNumb - 1]?.question}
          </p>
        )}
      </div>
      <div className=" h-[100%] bg-bl0 w-[50vw] items-center justify-center flex flex-wrap gap-y-[7vh] gap-x-[10vw] p-6">
        {/* map out answers*/}

        {curQuesNumb && unfilteredData[curQuesNumb - 1]?.type == "type1" && (
          <PlayQuizt1 />
        )}
        {curQuesNumb && unfilteredData[curQuesNumb - 1]?.type == "type2" && (
          <PlayQuizt2 />
        )}
        {curQuesNumb && unfilteredData[curQuesNumb - 1]?.type == "type4" && (
          <PlayQuizt4 />
        )}
        {/* <PlayQuizt2 /> */}
      </div>
    </div>
  );
};
