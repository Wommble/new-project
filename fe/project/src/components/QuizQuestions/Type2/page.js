"use client";
import { useState, useContext, useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { quizContext } from "../../QuizContext/page";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/firebase";

export function TypeTwo({ setType, type }) {
  const [numOfQus, setsNumOfQus] = useState(1);
  const { quesNumb, sendQuesBE } = useContext(quizContext);

  const yupObject = Array(numOfQus)
    .fill("")
    .reduce(
      (prev, _, index) => {
        return {
          ...prev,
          [index]: yup.object({
            isCorrect: yup.string().required("huush bugluuch"),
            answer: yup.string().required("huush bugluuch"),
          }),
        };
      },
      {
        question: yup.string().required(),
        typeOfQuiz: yup.string(),
      }
    );
  const schema = yup.object(yupObject);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: Array(numOfQus)
      .fill("")
      .reduce((prev, _, index) => ({ ...prev, [index]: {} }), {
        typeOfQuiz: type,
      }),
    onSubmit: async (value) => {
      sendPhoto(value);
    },
  });

  let check = false;
  const sendPhoto = async (value) => {
    const { question, typeOfQuiz, ...others } = value;
    console.log("-0-----", others);
    const answers = await Promise.all(
      Object.values(others).map(async (q) => {
        const img = q.isCorrect;
        const curTime = Date.now().toString();
        const imgName = q.answer + curTime + ".png";

        let blob = await fetch(img).then((r) => r.blob());
        const storageRef = ref(storage, imgName);
        const snapshot = await uploadBytes(storageRef, blob);
        console.log(blob);
        const name = snapshot.ref._location.path;

        const url = await getDownloadURL(ref(storage, name));
        return { ...q, isCorrect: url };
      })
    );
    sendQues(check, { ...answers, question, typeOfQuiz });
  };
  console.log(formik.values, "is changing ");

  // const visibleTodos = useMemo(
  //   () => filterTodos(todos, tab),
  //   [todos, tab]
  // );
  const sendQues = async (check, questions) => {
    if (questions) {
      console.log(questions, "senduiferhfijo");
      sendQuesBE(questions);
      await setType("type1");
    }
  };

  const addQuestion = () => {
    if (numOfQus < 5) {
      setsNumOfQus(numOfQus + 1);
    }
  };
  const removeQuestion = () => {
    if (numOfQus != 1) {
      setsNumOfQus(numOfQus - 1);
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-10 overflow-y-auto w-full items-center py-[100px] ">
      <p className="text-[#b3b3b3]">
        Please drag the img to the correct statement
      </p>
      <input
        placeholder="Question "
        className="p-2 rounded-md w-[30%]"
        onChange={formik.handleChange("question")}
        value={formik.values.question}
        type="string"></input>

      {Array(numOfQus)
        .fill("")
        .map((_, index) => (
          <Type2Format formik={formik} index={index} />
        ))}
      <div className="absolute bottom-[40px] left-[30px] flex flex-row  gap-8">
        <button
          className=" text-xl border-2 border-[#992a4c] p-5  rounded-full "
          onClick={addQuestion}
          type="button">
          Add
        </button>
        <button
          className="text-xl border-2 border-[#992a4c] p-5 rounded-full "
          onClick={removeQuestion}
          type="button">
          Remove
        </button>

        <button
          className="text-xl border-2 border-[#992a4c] p-5 rounded-full "
          type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
export const Type2Format = ({ formik, index }) => {
  const fileChange = async (e) => {
    formik.setFieldValue(
      `${index}.isCorrect`,
      URL.createObjectURL(e.target.files[0])
    );
  };

  if (!formik.values) return <>loading</>;

  return (
    <div className="flex flex-row  w-full items-center gap-[10%] justify-center">
      <div className="border-1 border-dash w-[210px] h-[210px]">
        <input
          className="relative top-0 bg-pink-700 w-[260px] h-[200px] z-10 opacity-0 "
          onChange={fileChange}
          type="file"
          id="myfile"
          name="myfile"
          accept="image/png"></input>
        {formik.values[index] && (
          <img
            className="w-[260px] h-[200px] relative z-0  top-[-198px]"
            src={formik.values[index].isCorrect}></img>
        )}
      </div>

      <input
        className="p-2 rounded-md "
        placeholder="Answer"
        onChange={(e) => {
          formik.setFieldValue(`${index}.answer`, e.target.value);
        }}
      />
    </div>
  );
};
