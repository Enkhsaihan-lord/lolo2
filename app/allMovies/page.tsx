"use client";
import { useEffect, useState } from "react";
const Page = () => {
  const [movie, setMovies] = useState([]);
  const getMovies = async () => {
    const res = await fetch(`/api/moviePost`);
    const data = await res.json();
    setMovies(data);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {movie.map((m) => (
        <div key={m.id}>{m.name}</div>
      ))}
    </div>
  );
};
export default Page;
