"use client";

import { useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import * as yup from "yup";
import { userContext } from "../useCont/page";
import { BACK_URL } from "@/back-end-url";

const validationSchemaSignUp = yup.object({
  logInEmail: yup
    .string()
    .email(`You must submit an email to make an account`)
    .min(5)
    .required(`You must fill in the username to make an account`),
  logInPassword: yup
    .string()
    .max(20)
    .min(8)
    .required(`You must make a password to make a new acccount`),
});

export function LogIn() {
  const { setSignLog } = useContext(userContext);

  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState();
  const fromikLogIn = useFormik({
    initialValues: {
      logInEmail: "",
      logInPassword: "",
    },
    validationSchema: validationSchemaSignUp,
    onSubmit: async (value) => {
      LongInFunc(value);
    },
  });
  const LongInFunc = async (value) => {
    if ((!fromikLogIn.errors.logInEmail, !fromikLogIn.errors.logInPassword)) {
      const res = await axios.post(`${BACK_URL}/logIn`, {
        email: value.logInEmail,
        password: value.logInPassword,
      });
      console.log(res.data);
      if (res.data.stat) {
        Cookies.set("token", res.data.token, { expires: 7 });
        Cookies.set("id", res.data.stat, { expires: 7 });
        setSignLog(false);
      } else {
        alert("This email is not registered or the password is wrong");
        fromikLogIn.setFieldError("logInEmail", "failed");
      }
    }
  };
  const takeToSignUp = () => {
    if (Cookies.get("id") == "undefined" || !Cookies.get("id")) {
      setSignLog("sign");
    } else if (Cookies.get("id") !== "undefined") {
      router.push("/BrowseQuiz");
    }
  };
  const getout = () => {
    setSignLog(false);
  };
  return (
    <div>
      <button
        onClick={getout}
        className="flex flex-col bg-[#121212] opacity-75 h-full w-full fixed top-[0px]"></button>
      <form onSubmit={fromikLogIn.handleSubmit}>
        <div className="w-[500px] h-[700px] bg-[#404040] absolute mx-[40vw] mt-[10vh] flex flex-col items-center gap-[200px]  p-7 top-[0]">
          <p className="text-4xl mb-[100px] font-semibold text-white">
            Log in to your account
          </p>

          <div className="flex flex-col  absolute  top-[170px] ">
            <div className="w-[450px] flex flex-col mb-[15px]  gap-1 h-[78px]">
              <input
                className="h-[50px] bg-[#181818] p-2"
                placeholder="Email"
                onChange={fromikLogIn.handleChange("logInEmail")}
                value={fromikLogIn.values.logInEmail}
                type="string"
                variant={
                  fromikLogIn.errors.logInEmail ? "error" : "default"
                }></input>
              {fromikLogIn.errors.logInEmail && (
                <p className="text-gray-400 font-[1px]">
                  {fromikLogIn.errors.logInEmail}
                </p>
              )}
            </div>
            <div className="w-[450px] flex flex-col gap-1 h-[78px]">
              <input
                className="h-[50px] bg-[#181818] p-2 "
                placeholder="Password"
                onChange={fromikLogIn.handleChange("logInPassword")}
                value={fromikLogIn.values.logInPassword}
                variant={
                  fromikLogIn.errors.logInPassword ? "error" : "default"
                }></input>
              {fromikLogIn.errors.logInPassword && (
                <p className="text-gray-400 font-[1px]">
                  {fromikLogIn.errors.logInPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-[230px]">
            <button
              className="bg-[#992a4c] p-4 w-[450px] text-lg text-semibold text-white"
              type="submit">
              Log in
            </button>
            <div className="flex flex-row gap-1 text-[#b3b3b3]">
              <p> if you don't have an account you can always</p>
              <button
                className="text-[#992a4c] underline"
                onClick={takeToSignUp}>
                sign up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
