"use client";
import { useSearchParams } from "next/navigation";
import { UpperBar } from "../../components/Homebar/page";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { userContext } from "@/components/useCont/page";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/firebase";
import { BACK_URL } from "@/back-end-url";
import axios from "axios";
import Link from "next/link";
export default function UserProfile() {
  const [profileInfo, setProfileInfo] = useState();
  const [profilePic, setProfilePic] = useState();
  const [editing, setEditing] = useState();
  const [changingName, setChangingName] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const profileId = params.get("id");
  const userId = Cookies.get("id");
  const getProfileInfo = async () => {
    const res = await axios.get(`${BACK_URL}/profileInfo/${profileId}`, {
      headers: {
        "x-access-token": Cookies.get("token"),
      },
    });
    if (res) {
      setProfileInfo(res.data.profile);
    } else if (!ref) {
      setProfileInfo(false);
    }
  };

  const LogOut = () => {
    var allCookies = document.cookie.split(";");

    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    // displayCookies.innerHTML = document.cookie;
    router.push("/");
  };

  const fileChange = async (e) => {
    const imgName = profileInfo.username + Date.now().toString() + ".png";
    const storageRef = ref(storage, imgName);
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, e.target.files[0], metadata);

    getDownloadURL(storageRef).then(async (url) => {
      setProfilePic(url);
      const res = await axios.patch(
        `${BACK_URL}/changePic/${userId}`,
        { profilePic: url },

        {
          headers: {
            "x-access-token": Cookies.get("token"),
          },
        }
      );
    });
  };
  const saveUsername = async () => {
    setEditing(false);
    await axios.patch(
      `${BACK_URL}/changeUsername`,
      { newUsername: changingName, userId: userId },

      {
        headers: {
          "x-access-token": Cookies.get("token"),
        },
      }
    );
  };
  const editingUserName = (e) => {
    setChangingName(e.target.value);
  };
  useEffect(() => {
    getProfileInfo();
  }, []);
  useEffect(() => {
    if (profileInfo) {
      setProfilePic(profileInfo.profilePic);
    }
  }, [profileInfo]);
  if (!profileInfo) {
    return <p>loading</p>;
  }
  return (
    <div>
      <UpperBar />
      <div className="flex flex-row px-[10vw]  py-[10vh]">
        <div className="flex flex-col items-center px-[4vw] gap-[1vh]">
          {profileId == userId && (
            <input
              className=" absolute h-[40vh] w-[40vh] rounded-full opacity-0"
              onChange={fileChange}
              type="file"
              id="myfile"
              name="myfile"
              accept="image/png"></input>
          )}
          {profileInfo.profilePic ? (
            <img
              className="  h-[40vh] w-[40vh] rounded-full border border-8"
              src={profilePic}></img>
          ) : (
            <img
              className="  h-[40vh] w-[40vh] rounded-full border border-8"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCmLpoMqFEz6iDxJl_L4dJhqLqyhGej5qBg&usqp=CAU"></img>
          )}

          {editing ? (
            <div className="py-5 ">
              <input
                onChange={editingUserName}
                className="border-b-3 border-black text-6xl py-5 text-3xl py-5 bg-inherit  w-[18vw] "
                placeholder={profileInfo.username}></input>
              <hr className=""></hr>
            </div>
          ) : (
            <p className="text-6xl py-5">{profileInfo.username}</p>
          )}
          {profileId == userId && (
            <div className="flex flex-col gap-4 w-[10vw]">
              {!editing ? (
                <button
                  onClick={() => {
                    setEditing(!editing);
                  }}
                  className="w-[100%] bg-pink-400 p-3 text-xl rounded-lg  border-2 border">
                  Edit profile
                </button>
              ) : (
                <div className="flex flex-row gap-2">
                  {" "}
                  <button
                    className="w-[50%] bg-pink-400 p-3 text-xl rounded-lg  border-2 border"
                    onClick={saveUsername}>
                    Save
                  </button>{" "}
                  <button
                    className="w-[50%] bg-pink-400 p-3 text-xl rounded-lg  border-2 border"
                    onClick={() => {
                      setEditing(!editing);
                    }}>
                    Cancel
                  </button>
                </div>
              )}

              <button onClick={LogOut} className="opacity-70">
                Log out
              </button>
            </div>
          )}
        </div>
        <div className="w-[60%] bg-zinc-200  ">
          <PersonalQuizes
            profileId={profileId}
            userId={userId}
            profileInfo={profileInfo}
          />
        </div>
      </div>
    </div>
  );
}

const PersonalQuizes = ({ userId, profileId, profileInfo }) => {
  const { userData } = useContext(userContext);
  const params = useSearchParams();
  const [quizInfo, setQuizInfo] = useState();

  useEffect(() => {
    getPersonalQuizes();
  }, []);
  const getPersonalQuizes = async () => {
    const res = await axios.get(
      `${BACK_URL}/profileQuizes/${profileId}`,

      {
        headers: {
          "x-access-token": Cookies.get("token"),
        },
      }
    );
    console.log(res);
    if (res.data.quizes) {
      setQuizInfo(res.data.quizes);
    } else if (!res.data.quizes) {
      console.log("they have made no quizes");
    }
  };
  const deleteQuiz = async (quizId) => {
    console.log(quizId, "llllll");
    await axios.delete(
      `${BACK_URL}/deleteQuiz/${quizId}`,

      {
        headers: {
          "x-access-token": Cookies.get("token"),
        },
      }
    );
  };
  if (!quizInfo) {
    return (
      <img
        className="animate-spin opacitry-50 py-10  "
        src="../../../rotate-right-solid.svg"
      />
    );
  }
  console.log(quizInfo);
  return (
    <div className="relative flex flex-wrap gap-[4%] rounded-md  justify-right px-10">
      {quizInfo !== "no" ? (
        quizInfo.map(({ quizId, quizName, description }) => (
          <div className="w-[46vh] h-[25vh] bg-[#181818] mt-5 rounded-lg p-4 border-2 border-[#00]] flex flex-col gap-y-5 ">
            <Link href={"/PlayQuiz?quizId=" + quizId}>
              <p className="text-4xl pb-2 w-[80%] truncate ">{quizName} </p>
              <hr className="bg-[#992a4c] "></hr>
              <p className="truncate text-[#b3b3b3] h-[10vh] p-1 whitespace-normal w-[100%] pt-5">
                {description}
              </p>
            </Link>
            <div className="flex flex-row justify-between items-center gap-[5vw] ">
              <p className="pt-[3%] text-xl text-wrap w-[10vw]">
                {profileInfo.username}
              </p>
              {userId == profileId && (
                <button
                  onClick={(e) => deleteQuiz(quizId)}
                  className="border border-rose-600 rounded-md px-5 py-4">
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className=" relative flex flex-row justify-center items-center top-10 left-[17vw]">
          This person has not made any quizes
        </p>
      )}
    </div>
  );
};
