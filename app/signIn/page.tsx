"use client";
import { NextRequest, NextResponse } from "next/server";
import { useState, useEffect } from "react";
const Page = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleInputValue = async (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "email") {
      setUserInfo({ ...userInfo, email: value });
    }
    if (name === "password") {
      setUserInfo({ ...userInfo, password: value });
    }
  };
  const loginUser = async () => {
    const res = await fetch(`/api/movieUser/signIn`);
    const data = await res.json();
    setUserInfo(data);
  };
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0a1930] rounded-2xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Log in to your account</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              email хаяг
            </label>
            <input
              type="email"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              placeholder="email"
              name="email"
              onChange={handleInputValue}
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
              onChange={handleInputValue}
            />
          </div>
          <button
            type="submit"
            onClick={loginUser}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition active:scale-95 duration-200"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-sm">
          <p className="text-slate-400">
            Don't have an account?
            <a
              href="#"
              className="text-indigo-400 hover:text-indigo-300 ml-1 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page;
