"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { UpperBar } from "../Homebar/page";
import { LogSignFunc } from "../LogSignFunc/page";
import { userContext } from "../useCont/page";
import { BACK_URL } from "@/back-end-url";

export function HomePage() {
  const router = useRouter();
  const { setSignLog, signLog } = useContext(userContext);
  const TakeToBrowser = () => {
    if (Cookies.get("id") == "undefined" || !Cookies.get("id")) {
      setSignLog("log");
    } else if (Cookies.get("id") !== "undefined") {
      router.push("/BrowseQuiz");
    }
  };
  const create = async () => {
    if (Cookies.get("id") == "undefined" || !Cookies.get("id")) {
      setSignLog("log");
    } else if (Cookies.get("id") && !Cookies.get("quizId")) {
      const res = await axios.post(
        `${BACK_URL}/createQuiz`,
        {
          userId: Cookies.get("id"),
        },
        {
          headers: {
            "x-access-token": Cookies.get("token"),
          },
        }
      );
      if (res.data.status) {
        Cookies.set("quizId", res.data.quizId);
        router.push("/CreateQuiz");
        Cookies.set("quesNumb", 1);
      } else if (res.data.quizId) {
        router.push("/CreateQuiz");
      }
    } else if (Cookies.get("id") && Cookies.get("quizId")) {
      router.push("/CreateQuiz");
    }
  };
  return (
    <div>
      {!signLog && <UpperBar />}
      <div className="py-[200px] px-[5%] flex flex-row items-center justify-center gap-[50px]">
        <button
          className=" text-6xl border-[5px] border-solid border-[#992a4c] rounded-lg py-[40px] w-[500px] font-semibold text-white"
          onClick={TakeToBrowser}>
          <p>Play</p>
        </button>
        <button
          onClick={create}
          className=" text-6xl border-[5px] border-solid border-[#992a4c]
          rounded-lg py-[40px] w-[500px] font-semibold px-[70px] text-white">
          Create Quiz
        </button>
      </div>
      <LogSignFunc></LogSignFunc>
    </div>
  );
}
