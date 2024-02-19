"use client ";

import { playingQuiz } from "@/components/PlayingQuizConst/page";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NextQuestionButton } from "@/components/nextButton/page";

const validationSchema = yup.object({
  isCorrect: yup.string().required(),
  chosenAnswer: yup.string().required(),
});

export function PlayQuizt1() {
  const { curQuesNumb } = useContext(playingQuiz);
  const { unfilteredData } = useContext(playingQuiz);
  const { nextQues } = useContext(playingQuiz);
  const curnumb = curQuesNumb - 1;
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      nextQues([value]);
      console.log("is sending");
    },
  });

  const checkAns = (isCorrect) => {
    formik.setFieldValue(`chosenAnswer`, isCorrect);
    formik.setFieldValue("isCorrect", true);
    if (isCorrect === "true") {
      console.log(isCorrect);
    } else {
    }
  };

  return (
    <div className="flex flex-wrap gap-[5vw] justify-center">
      {unfilteredData?.[curnumb]?.answers?.map(({ answer, isCorrect }) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              checkAns(isCorrect);
            }}
            className=" flex flex-row justify-center rounded-lg border-2 border-[#ffff] py-7  text-4xl focus:bg-pink-400 w-[15vw]">
            {answer}
          </button>
        );
      })}

      <NextQuestionButton formik={formik} />
    </div>
  );
}
