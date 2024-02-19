"use client";
import Cookies from "js-cookie";
import { UpperBar } from "../../components/Homebar/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { BACK_URL } from "@/back-end-url";
export default function BrowseQuizes() {
  const [quizInfo, setQuizInfo] = useState();
  const [numbQuizes, setNumbQuizes] = useState(12);
  const [loadMore, setLoadMore] = useState(false);

  const fetchData = async () => {
    const res = await axios.get(`${BACK_URL}/loadQuizes`, {
      headers: {
        "x-access-token": Cookies.get("token"),
      },
    });
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    console.log(res, getRandomInt(3000) + Date.now());
    setQuizInfo(res.data.quizes, numbQuizes, "hh");
    if (res.data.quizes.length > numbQuizes) {
      setLoadMore(true);
    }
  };
  const ifLoading = () => {
    if (quizInfo.length > numbQuizes) {
      setLoadMore(true);
      return;
    } else if (numbQuizes > quizInfo.length) {
      setLoadMore(false);
    }
  };
  const loadMoreQuiz = () => {
    if (loadMore) {
      setNumbQuizes(numbQuizes + 6);
    }
    ifLoading();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" flex justify-center">
      <UpperBar></UpperBar>

      <div className=" flex flex-col justify-center items-center w-[80vw]  p-[90px]">
        {!quizInfo && (
          <img
            className="animate-spin opacitry-50 py-10"
            src="../../../rotate-right-solid.svg"
          />
        )}
        {quizInfo && (
          <QuizCardStyle quizInfo={quizInfo} numbQuizes={numbQuizes} />
        )}
        {loadMore && (
          <button onClick={loadMoreQuiz} className="mt-[15vh] underline">
            {" "}
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

const QuizCardStyle = ({ quizInfo, numbQuizes }) => {
  {
    Array(quizInfo).forEach((quiz, index) => console.log(quiz[index]));
  }

  return (
    <div className="flex flex-wrap  gap-[4%]  py-4">
      {quizInfo.slice(0, numbQuizes).map((quiz, index) => (
        <ReturnComponent quiz={quiz} />
      ))}
    </div>
  );
};

const ReturnComponent = ({ quiz }) => {
  const [quizSettings, setQuizSettings] = useState(false);
  return (
    <div className=" relative w-[46vh] h-[25vh] bg-[#181818] mt-5 rounded-lg p-4 border-2 border-[#00]] flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <p className="text-4xl">{quiz[0]?.quizName} </p>
        <button
          className={`${
            !quizSettings ? "absolute left-[19vw]" : "absolute left-[19vw] "
          }`}
          onClick={() => {
            setQuizSettings(!quizSettings);
          }}>
          <img src="../../../ellipsis-solid (1).svg" />
        </button>
        {quizSettings && (
          <div className="absolute border border-2 border-pink-800 bg-pink-800  bottom-[19vh] left-[21vw] p-4 rounded-lg w-[10vw] z-10">
            <Link
              href={"/UserProfile?id=" + quiz[0]?.creatorId}
              className="text-sm">
              View Creator Profile
            </Link>
          </div>
        )}
      </div>
      <hr className="bg-[#992a4c]"></hr>
      <Link href={"/PlayQuiz?quizId=" + quiz[0]?.quizId}>
        <p className="truncate text-[#b3b3b3] h-[10vh] p-1 whitespace-normal w-[100%] ">
          {quiz[0]?.description}
        </p>
      </Link>
      <Link
        href={"/UserProfile?id=" + quiz[0]?.creatorId}
        className=" absolute bottom-[1vh] text-xl text-white">
        {quiz[1]}
      </Link>
    </div>
  );
};
