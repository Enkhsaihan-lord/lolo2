"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]); // Анхны утга хоосон массив
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const res = await fetch(`/api/movieUser/users`);
      const data = await res.json();

      // Хэрэв дата массив биш бол (алдааны объект ирвэл) хоосон массив онооно
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Дата авахад алдаа гарлаа:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: number, newRole: string) => {
    try {
      const res = await fetch(`/api/movieUser/updateRole`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
        );
      }
    } catch (err) {
      alert("Эрх солиход алдаа гарлаа");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f1014] text-white flex items-center justify-center">
        Уншиж байна...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1014] p-6 text-gray-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold text-white mb-6 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
          Хэрэглэгчийн удирдлага
        </h1>

        <div className="bg-[#1a1b21] rounded-sm border border-gray-800 shadow-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#25262d] text-[11px] text-gray-400 uppercase font-black tracking-widest">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Хэрэглэгчийн нэр</th>
                <th className="p-4">Имэйл хаяг</th>
                <th className="p-4">Одоогийн эрх</th>
                <th className="p-4 text-center">Эрх өөрчлөх</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-800">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#202127] transition duration-200"
                  >
                    <td className="p-4 text-gray-500 font-mono text-xs">
                      #{user.id}
                    </td>
                    <td className="p-4 text-gray-200 font-bold">{user.name}</td>
                    <td className="p-4 text-gray-400 text-xs">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-black uppercase ${
                          user.role === "Premium"
                            ? "bg-yellow-600 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {user.role || "Normal"}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <button
                        onClick={() => updateRole(user.id, "Premium")}
                        className="bg-[#2a2b32] hover:bg-yellow-600 hover:text-white px-3 py-1 rounded-sm text-[10px] font-bold transition duration-300"
                      >
                        PREMIUM
                      </button>
                      <button
                        onClick={() => updateRole(user.id, "Normal")}
                        className="bg-[#2a2b32] hover:bg-gray-600 hover:text-white px-3 py-1 rounded-sm text-[10px] font-bold transition duration-300"
                      >
                        NORMAL
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-gray-600 italic"
                  >
                    Хэрэглэгч олдсонгүй эсвэл дата алдаатай байна.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
