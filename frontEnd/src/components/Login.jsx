import React, { useState } from "react";
import { Axios } from "../axios/axios";

const Login = () => {
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });


  const handleSubmit = async () => {
    
  };
  return (
    <div className=" absolute top-0 left-0  size-full  backdrop-blur-sm  bg-transparent z-20">
      <div className="w-96 top-20  left-[550px] absolute px-4 py-2 backdrop-blur-lg ">
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

export default Login;
