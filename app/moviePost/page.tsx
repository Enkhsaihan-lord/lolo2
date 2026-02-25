"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upload } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { ChangeEvent, useState } from "react";
const Page = () => {
  const [movieInfo, setMovieInfo] = useState({
    name: "",
    description: "",
    url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
    }
  };
  const inputHandleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setMovieInfo({ ...movieInfo, name: value });
    }
    if (name === "description") {
      setMovieInfo({ ...movieInfo, description: value });
    }
    if (name === "url") {
      setMovieInfo({ ...movieInfo, url: value });
    }
  };
  const createMovie = async () => {
    const res = await fetch(`/api/moviePost`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(movieInfo),
    });
    const data = await res.json();
    setMovieInfo(data);
  };
  const fetchVercel = async () => {
    const res = await fetch(`/api/images/upload`, {
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(file),
    });
  };

  console.log(setFile);
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#161616] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            New Movie
          </h1>
          <p className="text-zinc-400 mt-2">Киноны мэдээллээ оруулна уу</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">
              Киноны нэр
            </label>
            <input
              type="text"
              name="name"
              onChange={inputHandleValue}
              className="w-full bg-[#202020] border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="Movie name..."
            />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">
              Постер URL
            </label>
            <input
              type="url"
              required
              name="url"
              onChange={inputHandleValue}
              className="w-full bg-[#202020] border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">
              Тайлбар
            </label>
            <input
              name="description"
              onChange={inputHandleValue}
              placeholder="Movie description..."
              className="w-full bg-[#202020] border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none w-[40px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-400 ml-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              placeholder="image"
              className="w-full bg-[#202020] border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none w-[40px]"
            />
          </div>
          <button
            onClick={createMovie}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};
export default Page;
