import { useContext, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { quizContext } from "@/components/QuizContext/page";
import { Unfinished } from "@/components/Unfnished/page";
export function TypeThree({ type, setType }) {
  const [numOfAns, setNumOfAns] = useState(1);
  const { sendQuesBE } = useContext(quizContext);

  const yupObject = Array(numOfAns)
    .fill("")
    .reduce((prev, _, index) => {
      return {
        ...prev,
        [`answer${index}`]: yup.object({
          answer: yup.string().required("answer huush bugluuch"),
          isCorrect: yup.number().required("iscoreect huush bugluuch"),
        }),
        question1: yup.string().required("huush bugluuch"),
        question2: yup.string().required("huush bugluuch"),
        question3: yup.string().required("huush bugluuch"),
      };
    }, {});

  const schema = yup.object(yupObject);

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {},
    onSubmit: async (values) => {
      sendQues(values);
      console.log("is submitting");
    },
  });
  const sendQues = (values) => {
    setType("type1");
    console.log(values);
    values["type"] = type;
    if (values) {
      console.log("yepp");
      values["question"] = [
        { ques: question1 },
        { ques: question2 },
        { ques: question3 },
      ];
      console.log(values, "ygfeyfh");
    }
  };
  const addAns = () => {
    if (numOfAns <= 5) {
      setNumOfAns(numOfAns + 1);
    }
  };
  const removeAns = () => {
    if (numOfAns != 1) {
      setNumOfAns(numOfAns - 1);
    }
  };
  return (
    <div>
      <form
        className="flex flex-col gap-5  w-[900px]"
        onSubmit={formik.handleSubmit}>
        <div className="flex flex-row gap-4 pl-[100px] justify-end">
          <input
            onChange={formik.handleChange("question1")}
            value={formik.values.question1}></input>
          <input
            onChange={formik.handleChange("question2")}
            value={formik.values.question2}></input>
          <input
            onChange={formik.handleChange("question3")}
            value={formik.values.question3}></input>
        </div>
        <hr></hr>

        {Array(numOfAns)
          .fill("")
          .map((_, index) => (
            <Type3Format
              key={`ans-${index}`}
              formik={formik}
              index={"answer" + index}
            />
          ))}
        <div className="absolute bottom-[40px] left-[30px] flex flex-row  gap-8">
          <button
            className=" text-xl border-2 border-[#992a4c] p-5  rounded-full "
            onClick={addAns}
            type="button">
            Add
          </button>
          <button
            className="text-xl border-2 border-[#992a4c] p-5 rounded-full "
            onClick={removeAns}
            type="button">
            Remove
          </button>
          <button
            className="text-xl border-2 border-[#992a4c] p-5 rounded-full "
            type="submit">
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
}
const Type3Format = ({ index, formik }) => {
  return (
    <div className="flex flex-row gap-[26%]">
      <input
        onChange={(e) => {
          formik.setFieldValue(`${index}.answer`, e.target.value);
        }}></input>
      <Check index={index} formik={formik} />
    </div>
  );
};
const Check = ({ index, formik }) => {
  return (
    <div>
      <div className="flex flex-row gap-[470%]">
        <input
          type="radio"
          name={`bla${index}`}
          onChange={(e) => {
            formik.setFieldValue(`${index}.isCorrect`, e.target.value);
          }}
          value="1"
        />
        <input
          type="radio"
          name={`bla${index}`}
          onChange={(e) => {
            formik.setFieldValue(`${index}.isCorrect`, e.target.value);
          }}
          value="2"
        />
        <input
          type="radio"
          name={`bla${index}`}
          onChange={(e) => {
            formik.setFieldValue(`${index}.isCorrect`, e.target.value);
          }}
          value="3"
        />
      </div>
    </div>
  );
};
