"use client";
import { useEffect, useState } from "react";

interface Movie {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
}

const Page = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");

  const getMovie = async () => {
    try {
      const res = await fetch(`/api/moviePost`);
      const data = await res.json();
      setAllMovies(data);
    } catch (error) {
      console.error("Дата авахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f1014] text-white flex items-center justify-center">
        Уншиж байна...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1014] text-[#ccc] font-sans">
      <nav className="bg-[#1a1b21] border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-black text-white tracking-tighter">
            FMOVIE
          </h1>
          <ul className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-wide text-gray-300">
            <li className="hover:text-white cursor-pointer transition">
              Эхлэл
            </li>
            <li className="text-white border-b-2 border-blue-500 cursor-pointer">
              Кино
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Олон ангит
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Заавар
            </li>
          </ul>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#2a2b32] rounded-md py-1.5 px-4 text-sm w-64 outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto flex flex-col md:flex-row p-6 gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 border-l-4 border-blue-500 pl-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">
              ШИНЭ КИНО
            </h2>
            <button className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 uppercase font-bold">
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {allMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-sm overflow-hidden mb-2 shadow-lg">
                  <span className="absolute top-2 left-2 bg-red-600 text-[10px] text-white px-1.5 py-0.5 font-bold rounded-sm z-10">
                    ХАДМАЛ
                  </span>
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                      <svg
                        className="w-8 h-8 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 line-clamp-1 group-hover:text-blue-400 transition">
                  {movie.name}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Jan. 14, 2026
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;