"use client";

import { useContext } from "react";
import { playingQuiz } from "../PlayingQuizConst/page";

export function NextQuestionButton({ formik }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        console.log("plz");
        formik.handleSubmit();
      }}
      type="submit"
      className="text-4xl mt-10 underline h-[10vh] border-2 rounded-lg w-full bg-[#c0345f]">
      Next
    </button>
  );
}
