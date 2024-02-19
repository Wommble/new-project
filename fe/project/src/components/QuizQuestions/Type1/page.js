import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useContext } from "react";
import { quizContext } from "@/components/QuizContext/page";
import { useRouter } from "next/navigation";

export function TypeOne({ setType, type }) {
  const [numOfAns, setNumOfAns] = useState(4);
  const { sendQuesBE } = useContext(quizContext);
  const router = useRouter();
  console.log(type);
  const yupObject = Array(setNumOfAns)
    .fill("")
    .reduce(
      (prev, _, index) => {
        return {
          ...prev,
          [index]: yup.object({
            isCorrect: yup.string().required("huush bugluuch"),
            answer: yup.string().required(),
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
    initialValues: Array(setNumOfAns)
      .fill("")
      .reduce(
        (prev, _, index) => ({ ...prev, [index]: { isCorrect: false } }),
        { typeOfQuiz: type }
      ),
    onSubmit: async (value) => {
      sendQues(value);
      console.log(!formik.errors);
    },
  });

  const sendQues = (value) => {
    if (formik.errors) {
      sendQuesBE(value);

      router.refresh();
    }
  };
  console.log(formik.values);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-10 justify-center items-center">
      <input
        placeholder="Question"
        className="p-2 rounded-md  w-[70%]"
        onChange={formik.handleChange("question")}
        value={formik.values.question}></input>
      <div className="flex flex-wrap w-[80%] gap-x-[35%] gap-y-8 p-0">
        {Array(numOfAns)
          .fill("")
          .map((_, index) => (
            <TypeOneQues formik={formik} index={index} numOfAns={numOfAns} />
          ))}
      </div>

      <div className="absolute bottom-[40px] left-[30px] flex flex-row  gap-8">
        <button
          className="text-xl border-2 border-[#992a4c] p-5 rounded-full "
          type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
export const TypeOneQues = ({ formik, index, numOfAns }) => {
  const onFocusCheck = (e) => {
    for (let i = 0; i < numOfAns; i++) {
      formik.setFieldValue(`${i}.isCorrect`, i === index);
    }
  };
  return (
    <div className="flex flex-row gap-3">
      <input type="radio" name={`bla`} onFocus={onFocusCheck} />
      <input
        onChange={(e) => {
          formik.setFieldValue(`${index}.answer`, e.target.value);
        }}
        placeholder="Answer"
        className=" p-2 rounded-md"></input>
    </div>
  );
};
