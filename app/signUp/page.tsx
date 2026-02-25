"use client";
import { NextResponse } from "next/server";
import { useState } from "react";
type userInfo = {
  name: string;
  password: string;
  email: string;
};
const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [Perror, setPerror] = useState("");
  const inputHandleValue = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "name") {
      setUserInfo({ ...userInfo, name: value });
    }
    if (name === "email") {
      setUserInfo({ ...userInfo, email: value });
    }
    if (name === "password") {
      setUserInfo({ ...userInfo, password: value });
    }
    if (name === "confirmPassword") {
      setUserInfo({ ...userInfo, confirmPassword: value });
    }
  };
  const createUser = async () => {
    if (userInfo.password !== userInfo.confirmPassword) {
      console.log("nuuts ug zoroj baina!!");
    } else {
      const res = await fetch(`/api/movieUser/signUp`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        }),
      });
      const data = await res.json();
      setUserInfo(data);
    }
  };
  console.log(userInfo);
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0a1930] rounded-2xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Join our community today</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Нэр
            </label>
            <input
              type="text"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="name"
              name="name"
              onChange={inputHandleValue}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              email хаяг
            </label>
            <input
              type="email"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="email"
              name="email"
              onChange={inputHandleValue}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Нууц үг
            </label>
            <input
              type="password"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="password"
              name="password"
              onChange={inputHandleValue}
            />
          </div>
          <div>
            <label
              className="b
            lock text-sm font-medium text-slate-300 mb-2"
            >
              Нууц үг давтах
              <input
                type="password"
                className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                placeholder="confirmPassword"
                name="confirmPassword"
                onChange={inputHandleValue}
              />
            </label>
          </div>

          <button
            type="button"
            onClick={createUser}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition active:scale-95 duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-sm">
          <p className="text-slate-400">
            Already have an account?
            <a
              href="#"
              className="text-indigo-400 hover:text-indigo-300 ml-1 font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
