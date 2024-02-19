"use client ";
import { playingQuiz } from "@/components/PlayingQuizConst/page";
import { useContext, useState } from "react";
import { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NextQuestionButton } from "@/components/nextButton/page";

export function PlayQuizt2({ nextQuestion }) {
  const { unfilteredData } = useContext(playingQuiz);
  const { curQuesNumb } = useContext(playingQuiz);
  const { nextQues } = useContext(playingQuiz);
  const [values, setValues] = useState();
  const yupObject = Array(unfilteredData.length)
    .fill("")
    .reduce((prev, _, index) => {
      return {
        ...prev,
        [index]: yup.object({
          isCorrect: yup.string().required(""),
          chosenAnswer: yup.string().required(""),
        }),
      };
    });
  const schema = yup.object(yupObject);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: Array(unfilteredData.length)
      .fill("")
      .reduce((prev, _, index) => ({ ...prev, [index]: {} }), {}),
    onSubmit: async (value) => {
      console.log("is sendign");
      nextQues(Object.values(value));
    },
  });
  const ref = useRef(null);
  function dragLeave(ev, index) {
    formik.setFieldValue(`${index}.chosenAnswer`, "");
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  function drag(ev) {
    ref.current = ev.target;
  }
  function drop(ev) {
    ev.preventDefault();
    console.log(ref.current.src, "tghji");
    ev.target.appendChild(ref.current);
  }
  function dropAnswer(ev, index) {
    ev.preventDefault();
    console.log(ref.current.src, "dragged");
    const correctAnswer = unfilteredData[0].answers[index].isCorrect;
    console.log(correctAnswer, "the box", index);
    formik.setFieldValue(`${index}.chosenAnswer`, ref.current.src);
    formik.setFieldValue(`${index}.isCorrect`, correctAnswer);
    ev.target.appendChild(ref.current);
  }
  console.log(formik.values, "value");
  return (
    <div className=" flex flex-col gap-10 z-0">
      <Type2Form
        drop={drop}
        allowDrop={allowDrop}
        unfilteredData={unfilteredData}
        curQuesNumb={curQuesNumb}
        dropAnswer={dropAnswer}
        dragLeave={dragLeave}
      />

      <div
        onDrop={drop}
        onDragOver={allowDrop}
        className=" flex flex-wrap min-h-[200px] gap-2">
        {unfilteredData?.[curQuesNumb - 1]?.answers.map(({ isCorrect }) => {
          return (
            <img
              className="w-[260px] h-[200px] z-0  object-cover"
              id="drag1"
              src={isCorrect}
              onDragStart={drag}
              drag={drag}
              drop={drop}
            />
          );
        })}
      </div>
      <NextQuestionButton formik={formik} />
    </div>
  );
}
const Type2Form = ({
  allowDrop,
  dropAnswer,
  unfilteredData,
  dragLeave,
  curQuesNumb,
}) => {
  console.log(unfilteredData[curQuesNumb - 1].answers, "fuiuhjk");
  return (
    <div className="flex flex-row ">
      {unfilteredData?.[curQuesNumb - 1]?.answers.map((answer, index) => {
        // {unfilteredData?.[curQuesNumb - 1]?.answers.map(({ index, answer }) => {
        return (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-3xl">{answer.answer} </p>
            <div
              className="w-[260px] h-[200px] border-dashed border-2 "
              id="div1"
              onDrop={(e) => dropAnswer(e, index)}
              onDragOver={allowDrop}
              onDragLeave={(e) => dragLeave(e, index)}></div>
          </div>
        );
        // })}
      })}
    </div>
  );
};
