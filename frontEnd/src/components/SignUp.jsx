import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../axios/axios";

const SignUp = () => {
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await Axios.post(
        "/auth/signup",
        {
          firstName: userData.firstName,
          lastName: "",
          password: userData.password,
          username: userData.userName,
        },
        { withCredentials: true }
      );

      if (res?.status === 201) {
        navigate("/");
      }
    } catch (error) {
      if (error.status === 400) {
        navigate("/login");
      }
    }
  };
  return (
    <div className=" absolute top-0 left-0  size-full  backdrop-blur-sm  bg-transparent z-20">
      <div className="w-96 top-20  md:left-[550px] left-4 absolute px-4 py-2 backdrop-blur-lg ">
        <h1 className="font-bold text-white text-4xl">Create Account!</h1>
        <div className="my-10 text-white">
          <label className="text-xl font-medium my-3">
            FullName
            <input
              value={userData.firstName}
              onChange={(e) => {
                setuserData({ ...userData, firstName: e.target.value });
              }}
              type="text"
              className="w-full bg-zinc-600 h-12 my-2"
            />
          </label>
          <div className="my-6" />
          <label className="text-xl font-medium my-3">
            UserName
            <input
              value={userData.userName}
              onChange={(e) => {
                setuserData({ ...userData, userName: e.target.value });
              }}
              type="text"
              className="w-full bg-zinc-600 h-12 my-2"
            />
          </label>
          <div className="my-6" />
          <label className="text-xl font-medium my-3">
            password
            <input
              value={userData.password}
              onChange={(e) => {
                setuserData({ ...userData, password: e.target.value });
              }}
              type="password"
              className="w-full bg-zinc-600 h-12 my-2"
            />
          </label>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-green-500 hover:bg-green-600 my-3"
        >
          SignUp
        </button>
        <Link to={"/"} className="hover:text-green-500 text-white">
          Already have Account Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
