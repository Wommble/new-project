"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import * as yup from "yup";
import { useContext } from "react";
import { userContext } from "../useCont/page";
import { BACK_URL } from "@/back-end-url";
const validationSchemaSignUp = yup.object({
  signUpUserName: yup
    .string()
    .max(20)
    .min(1)
    .required(`You must fill in the username to make an account`),
  signUpEmail: yup
    .string()
    .email(`You must submit an email to make an account`)
    .min(5)
    .required(`You must fill in the username to make an account`),
  signUpPassword: yup
    .string()
    .max(20)
    .min(8)
    .required(`You must make a password to make a new acccount`),
});

export function SignUp() {
  const { setSignLog } = useContext(userContext);
  const router = useRouter();
  const formikSignUp = useFormik({
    initialValues: {
      signUpUserName: "",
      signUpEmail: "",
      signUpPassword: "",
    },
    validationSchema: validationSchemaSignUp,
    onSubmit: async (value) => {
      SignUpFunc(value);
    },
  });
  const SignUpFunc = async (value) => {
    if (!formikSignUp.errors.signUpEmail) {
      console.log(value, `${BACK_URL}/signUp`);
      const res = await axios.post(`${BACK_URL}/signUp`, {
        username: value.signUpUserName,
        email: value.signUpEmail,
        password: value.signUpPassword,
      });
      if (res.data.status) {
        Cookies.set("token", res.data.token, { expires: 7 });
        Cookies.set("id", res.data.id, { expires: 7 });
        setSignLog(false);
      } else {
        formikSignUp.setFieldError("signUpUserName", "failed");
        alert("that gmail has already been registered");
      }
    }
  };

  const LogIn = () => {
    setSignLog("log");
  };
  const getout = () => {
    setSignLog(false);
  };
  return (
    <div>
      <button
        onClick={getout}
        className="flex flex-col bg-[#121212] opacity-75 h-full w-full fixed top-[0px]"></button>
      <form onSubmit={formikSignUp.handleSubmit}>
        <div className="w-[500px] h-[700px] bg-[#404040] absolute mx-[40vw] mt-[10vh] flex flex-col items-center gap-[200px]  p-7 top-[0]">
          <p className="text-4xl mb-[100px] font-semibold text-white">
            Sign up and make an account
          </p>
          <div className="flex flex-col  absolute  top-[170px] ">
            <div className="w-[450px] flex flex-col mb-[15px]  gap-1 h-[78px]">
              <input
                placeholder="Username"
                className="h-[50px] bg-[#181818] p-2"
                onChange={formikSignUp.handleChange("signUpUserName")}
                value={formikSignUp.values.signUpUserName}
                type="string"
                variant={
                  formikSignUp.errors.signUpUserName ? "error" : "default"
                }></input>
              {formikSignUp.errors.signUpUserName && (
                <p className="text-gray-400 font-[2px]">
                  {formikSignUp.errors.signUpUserName}
                </p>
              )}
            </div>
            <div className="w-[450px] flex flex-col mb-[15px]  gap-1 h-[78px]">
              <input
                placeholder="Email"
                className="h-[50px] bg-[#181818] p-2"
                onChange={formikSignUp.handleChange("signUpEmail")}
                value={formikSignUp.values.signUpEmail}
                type="string"
                variant={
                  formikSignUp.errors.signUpEmail ? "error" : "default"
                }></input>
              {formikSignUp.errors.signUpEmail && (
                <p className="text-gray-400 font-[2px]">
                  {formikSignUp.errors.signUpEmail}
                </p>
              )}
            </div>
            <div className="w-[450px] flex flex-col mb-[15px]  gap-1 h-[78px]">
              <input
                placeholder="Password"
                className="h-[50px] bg-[#181818] p-2"
                onChange={formikSignUp.handleChange("signUpPassword")}
                value={formikSignUp.values.signUpPassword}
                type="string"
                variant={
                  formikSignUp.errors.signUpPassword ? "error" : "default"
                }></input>
              {formikSignUp.errors.signUpPassword && (
                <p className="text-gray-400 font-[2px]">
                  {formikSignUp.errors.signUpPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 mt-[110px] items-center">
              <div className="flex flex-row gap-1 text-[#b3b3b3]">
                <p>If you do have an account then you can always</p>

                <button onClick={LogIn} className="text-[#992a4c] underline">
                  log in
                </button>
              </div>
              <button
                className="bg-[#992a4c] p-4 w-[450px] text-lg text-semibold text-white"
                type="submit">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
