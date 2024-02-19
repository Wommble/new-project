"use client";

import { useContext, useEffect, useState } from "react";
import { playingQuiz } from "../PlayingQuizConst/page";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function FinishedQuiz() {
  const router = useRouter();
  const { totPoints } = useContext(playingQuiz);
  const {
    gottenPoint,
    setUnfilteredData,
    setFinishPlaying,
    setCurQuesNumb,
    setTotPoints,
    setGottenPoints,
  } = useContext(playingQuiz);
  const [text, setText] = useState("");
  useEffect(() => {
    setEndingText();
  });
  const setEndingText = () => {
    if (totPoints == gottenPoint) {
      setText("Congrats you answered all of the questions perfectly");
    } else if ((totPoints / 3) * 2 == gottenPoint) {
      setText("So close youy can do it next time");
    } else if (totPoints / 2 == gottenPoint) {
      setText("You got half of them right");
    } else if (totPoints / 3 == gottenPoint) {
      setText("Try harder next time");
    } else if (gottenPoint == 0) {
      setText("It's okay try better next time");
    } else {
      setText("Well done");
    }
  };
  const goBack = () => {
    setUnfilteredData([]);
    setFinishPlaying(false);
    setCurQuesNumb(1);
    setTotPoints(0);
    setGottenPoints(0);
    router.push("/");
  };
  return (
    <div className="flex flex-col bg-pink-400 mx-[2vw]">
      <p>
        {totPoints}, {gottenPoint}
      </p>
      <p>{text}</p>
      <button onClick={goBack}> go back to front page</button>
    </div>
  );
}
