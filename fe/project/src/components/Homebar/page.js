"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { LogSignFunc } from "../LogSignFunc/page";
import { userContext } from "../useCont/page";

export function UpperBar() {
  const { setSignLog } = useContext(userContext);
  const { userData } = useContext(userContext);
  const { profilePic } = useContext(userContext);
  const uid = Cookies.get("id");
  const Signs = () => {
    setSignLog("sign");
  };
  const Logs = () => {
    setSignLog("log");
  };

  return (
    <div className="fixed flex flex-row bg-[#181818] w-full h-[8%] py-4 items-center px-6  gap-[87%] z-20">
      <Link href="/" className="underline  decoration-[#992a4f] text-white">
        HomePage
      </Link>

      {userData ? (
        <div className="flex flex-row  items-center gap-5 pr-10">
          <Link href={"/UserProfile?id=" + uid}>
            <p
              className="underline decoration-[#992a4f]
            text-white">
              {userData}
            </p>
          </Link>
          <img
            className="border border-2 rounded-full h-[50px] w-[50px]"
            src={profilePic}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-7">
          <button onClick={Signs} className="underline text-[#910a4a]">
            Sign up
          </button>
          <button onClick={Logs} className="underline text-[#992a4c]">
            Log in
          </button>
        </div>
      )}
      <LogSignFunc />
    </div>
  );
}
