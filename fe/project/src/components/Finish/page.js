import { useContext } from "react";
import { quizContext } from "../QuizContext/page";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BACK_URL } from "@/back-end-url";

export function FinishQuiz() {
  const { setNameQuiz, setFinishQuizPage } = useContext(quizContext);
  const router = useRouter();
  const validationSchema = yup.object({
    quizName: yup.string().required(),
    quizDesc: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      quizName: "",
      quizDesc: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      FinQuiz(value);
    },
  });
  const FinQuiz = async (value) => {
    console.log(value);
    console.log(
      Cookies.get("id"),
      Cookies.get("quizId"),
      Cookies.get("quesNumb")
    );
    const res = await axios.post(
      `${BACK_URL}/finishQuiz`,
      {
        creatorId: Cookies.get("id"),
        quizId: Cookies.get("quizId"),
        totalQuestions: Cookies.get("quesNumb"),
        quizName: value.quizName,
        description: value.quizDesc,
      },
      {
        headers: {
          "x-access-token": Cookies.get("token"),
        },
      }
    );
    if (res.data) {
      console.log(res);
      setNameQuiz(false);
      setFinishQuizPage(false);
      document.cookie = "quizId" + "=;expires=" + new Date(0).toUTCString();
      Cookies.set("quesNumb", 1);
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="fixed flex flex-col justify-center items-center inset-x-10 inset-y-10 gap-10">
      <div className=" flex flex-col justify-center items-center w-[70%]">
        <p className="text-zinc-500 font-sm">
          please name the quiz before trying to submit it
        </p>
        <input
          className="w-full p-5 text-2xl rounded-md text-left"
          placeholder="Name of quiz"
          onChange={formik.handleChange("quizName")}
          value={formik.values.quizName}
          type="string"></input>
      </div>
      <input
        placeholder="Descripton for quiz "
        className="w-[70%] h-[20vh] px-3 py-0 text-2xl rounded-md"
        onChange={formik.handleChange("quizDesc")}
        value={formik.values.quizDesc}
        type="string"></input>
      <button type="submit" className="text-xl">
        Finish quiz
      </button>
    </form>
  );
}
export function FinQuizPage() {
  const { finishQuizPage, setFinishQuizPage, setNameQuiz } =
    useContext(quizContext);

  const goBack = () => {
    console.log("pls");
    setFinishQuizPage(false);
  };
  const finishQuiz = () => {
    setNameQuiz(true);
    setFinishQuizPage(false);
  };
  return (
    <div>
      <div className="w-[40vw] h-[30vh] bg-[#404040] absolute flex flex-col items-center justify-center p-7 inset-y-[30vh] inset-x-[30vw] ">
        <p className="text-xl mb-[100px] ">
          <p>Would you like to complete the quiz or go back and continue?</p>

          <div className=" flex flex-row gap-10 underline justify-center">
            <button onClick={finishQuiz}>Yes, im done</button>
            <button onClick={goBack} className="bg-pink-400">
              No, im not done
            </button>
          </div>
        </p>
      </div>
      {/* <div className="flex flex-col bg-[#121212] opacity-25 h-full w-[90%] fixed right-0 "></div> */}
    </div>
  );
}
