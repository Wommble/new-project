import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useContext } from "react";
import { quizContext } from "@/components/QuizContext/page";
import { useRouter } from "next/navigation";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/firebase";
export function TypeFour({ setType, type }) {
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
      sendPhoto(value);
      console.log("is ");
    },
  });
  let check = false;
  const sendPhoto = async (value) => {
    const { question, typeOfQuiz, ...others } = value;
    console.log("-0-----", others);
    const answers = await Promise.all(
      Object.values(others).map(async (q) => {
        const img = q.answer;
        const curTime = Date.now().toString();
        const imgName = q.question + "multi" + curTime + ".png";

        let blob = await fetch(img).then((r) => r.blob());
        const storageRef = ref(storage, imgName);
        const snapshot = await uploadBytes(storageRef, blob);
        console.log(blob);
        const name = snapshot.ref._location.path;

        const url = await getDownloadURL(ref(storage, name));
        return { ...q, answer: url };
      })
    );
    sendQues(check, { ...answers, question, typeOfQuiz });
  };
  const sendQues = async (check, questions) => {
    if (questions) {
      console.log(questions, "senduiferhfijo");
      sendQuesBE(questions);
      await setType("type1");
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
      <div className=" gap-x-[20%] gap-y-8 p-0 grid md:grid-cols-2 grid-cols-1">
        {Array(numOfAns)
          .fill("")
          .map((_, index) => (
            <TypeFourQues formik={formik} index={index} numOfAns={numOfAns} />
          ))}
      </div>

      <div className="absolute bottom-[40px] left-[30px] flex flex-row  gap-8 ">
        <button
          className="text-xl border-2 border-[#992a4c] p-5 rounded-full "
          type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
export const TypeFourQues = ({ formik, index, numOfAns }) => {
  const onFocusCheck = (e) => {
    for (let i = 0; i < numOfAns; i++) {
      formik.setFieldValue(`${i}.isCorrect`, i === index);
    }
  };
  const fileChange = async (e) => {
    formik.setFieldValue(
      `${index}.answer`,
      URL.createObjectURL(e.target.files[0])
    );
  };
  return (
    <div className="flex flex-row gap-4 m-5 ">
      <input type="radio" name={`bla`} onFocus={onFocusCheck} />
      <div className=" border border-4 border-dotted border-black w-[17vw] h-[20vh]">
        <input
          className="relative top-0  w-full h-[200px] z-10 border-dotted border-black opacity-0" //     ? //   formik.values[index].isCorrect // {`${
          //     : "w-[260px] h-[200px] z-10 opacity-80 bg-blue-400 "
          // }  z-10`}
          onChange={fileChange}
          type="file"
          id="myfile"
          name="myfile"
          accept="image/png"></input>
        {formik.values[index] && (
          <img
            className={`  ${
              formik.values[index].answer
                ? "relative  w-full h-[200px]  z-0 top-[-20vh]     object-cover"
                : "w-0 h-0 bg-pink-400"
            } `}
            sizes="contain"
            src={formik.values[index].answer}></img>
        )}
      </div>
    </div>
  );
};
