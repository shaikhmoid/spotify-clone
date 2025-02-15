import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XIcon } from "lucide-react";
import useAuthToogle from "../store/useAuthToogle";
import { Axios } from "../axios/axios";
import useProfileData from "../store/useProfileData";

const AuthPage = () => {
  const { toogleIsAuthfalse, toogleIsAuthTrue } = useAuthToogle();
  const { profileData, fetchProfileData } = useProfileData();
  const [error, seterror] = useState("");

  const handleLoginPopUp = () => {
    toogleIsAuthfalse();
  };
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await Axios.post(
        "/auth/login",
        {
          password: loginData.password,
          username: loginData.username,
        },
        { withCredentials: true }
      );
      fetchProfileData(res?.data?.user);
      if (res) {
        navigate("/");
        toogleIsAuthfalse();
      }
    } catch (error) {
      console.log(error);
      seterror(
        error.response.data.msg
          ? "Invalid username or password"
          : "feild is required"
      );
    }
  };

  return (
    <div className=" absolute top-0 left-0  size-full  backdrop-blur-sm  bg-transparent z-20">
      <div className="w-96 top-20  md:left-[550px] left-5 absolute px-4 py-2 backdrop-blur-lg ">
        <i onClick={handleLoginPopUp}>
          <XIcon className="absolute top-0 right-0" />
        </i>
        <h1 className="font-bold text-white text-8xl">Login</h1>
        <div className="my-10">
          <label className="text-xl font-medium my-3">
            UserName
            <input
              value={loginData.username}
              onChange={(e) => {
                setloginData({ ...loginData, username: e.target.value });
              }}
              type="text"
              className="w-full bg-zinc-600 h-12 my-2"
            />
          </label>
          <div className="my-6" />
          <label className="text-xl font-medium my-3">
            passwoed
            <input
              value={loginData.password}
              onChange={(e) => {
                setloginData({ ...loginData, password: e.target.value });
              }}
              type="password"
              className="w-full bg-zinc-600 h-12 my-2"
            />
          </label>
          <p className="text-red-500">{error}</p>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-green-500 hover:bg-green-600 my-3"
        >
          Login
        </button>
        <Link to={"/signUp"} className="hover:text-green-500">
          Dont have account signUp
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
