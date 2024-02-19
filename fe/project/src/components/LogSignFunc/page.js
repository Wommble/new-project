"use client";
import { LogIn } from "../LogIn/page";
import { SignUp } from "../SignUp/page";
import Cookies from "js-cookie";
import { useContext } from "react";
import { userContext } from "../useCont/page";

export function LogSignFunc(props) {
  const { verify } = useContext(userContext);
  const { signLog } = useContext(userContext);
  if (signLog == "log" && !Cookies.get("id")) {
    return <LogIn></LogIn>;
  } else if (signLog == "sign" && !Cookies.get("id")) {
    return <SignUp />;
  }
}
