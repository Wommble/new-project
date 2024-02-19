"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { playingQuiz } from "../PlayingQuizConst/page";
export function QuizOpt() {
  const { totPoints } = useContext(playingQuiz);
  const { gottenPoint } = useContext(playingQuiz);
  const [tryExit, setsTryExit] = useState(false);
  const Exit = () => {
    setsTryExit(true);
  };
  return (
    <div className="fixed flex flex-col justify-evenly items-center top-10 z-10 absolute">
      {!tryExit && (
        <button
          onClick={Exit}
          className="rounded-full border-[#ffffff] border-[3px] left-8 top-8 text-2xl fixed py-3 px-2 ">
          Exit
        </button>
      )}

      {tryExit && <TryExit setsTryExit={setsTryExit}></TryExit>}
      <p className="flex flex-row justify-center rounded-tl-lg rounded-bl-full border-4 right-0 top-0 text-4xl fixed p-10 pr-0 bg-black w-[7vw] ">
        {gottenPoint} / {totPoints}
      </p>
    </div>
  );
}
const TryExit = ({ setsTryExit }) => {
  const { setFinishPlaying } = useContext(playingQuiz);
  const { setUnfilteredData } = useContext(playingQuiz);
  const { setCurQuesNumb, setTotPoints, setGottenPoints } =
    useContext(playingQuiz);
  const router = useRouter();
  const cancel = () => {
    setsTryExit(false);
  };
  const exit = () => {
    router.push("/BrowseQuiz");
    setUnfilteredData([]);
    setFinishPlaying(false);
    setCurQuesNumb(1);
    setTotPoints(0);
    setGottenPoints(0);
  };
  return (
    <div className="w-[40vw] h-[60vh] bg-[#d8d8d8] flex flex-col  justify-center items-center gap-10 z-2">
      <p> If you exit your progress won't be saved</p>
      <div className="flex flex-row gap-10">
        <button onClick={exit}>Exit quiz</button>

        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
};
