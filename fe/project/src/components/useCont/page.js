"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BACK_URL } from "@/back-end-url";

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [signLog, setSignLog] = useState(false);
  const [userQuizes, setUserQuizes] = useState([]);
  const [profilePic, setProfilePic] = useState();
  const verify = async () => {
    if (Cookies.get("id") && Cookies.get("id") !== undefined) {
      console.log(`${BACK_URL}/verify`);
      const res = await axios.post(
        `${BACK_URL}/verify`,
        {
          id: Cookies.get("id"),
        },
        {
          headers: {
            "x-access-token": Cookies.get("token"),
          },
        }
      );
      res.data.data.quizes.forEach((element) => {
        setUserQuizes(element.quizId);
      });

      setUserData(res.data.data.username);
      setProfilePic(res.data.data.profilePic);
    }
  };

  useEffect(() => {
    verify();
  }, [Cookies.get("id")]);
  return (
    <userContext.Provider
      value={{
        userQuizes: userQuizes,
        setSignLog: setSignLog,
        signLog: signLog,
        userData: userData,
        profilePic: profilePic,
        setProfilePic: setProfilePic,
      }}>
      {children}
    </userContext.Provider>
  );
};
