import React, { useRef, useState } from "react";
import { logosvg } from "../app/constantes";
import Login from "./auth/Login";
import { useAuth } from "./auth/AuthContext";
import { useClickOutside } from "../app/useClickOutside.ts";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // vocales en icono
  const iniciales = usuario?.nombre
    ?.split(" ")
    .filter(Boolean)
    .map((palabra) => palabra[0].toUpperCase())
    .slice(0, 2)
    .join("");

  useClickOutside(menuRef, () => setShowMenu(false));

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-default bg-gray-100 dark:bg-zinc-900">
      <div className="w-full flex items-center justify-between mx-auto px-2 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 py-2 px-10">
          <img src={logosvg} className="h-12" alt="Logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-black">
            PeopleData
          </span>
        </a>

        {/* Sección derecha */}
        <div className="flex items-center space-x-4 px-8" ref={menuRef}>
          {!usuario ? (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-green-700 hover:ring-2 hover:ring-blue-500"
            >
              
              <svg
                className="w-6 h-6 text-gray-200 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2"
              >
                {/* logo iniciales  */}
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer">
                  {iniciales}
                </div>
                
                <span className="text-sm font-medium text-heading dark:text-white">
                  {usuario.nombre}
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-lg py-2 text-sm">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="font-semibold">{usuario.nombre}</p>
                    <p className="text-gray-400 text-xs">{usuario.email}</p>
                    <p className="text-gray-400 text-xs">{usuario.rol}</p>
                  </div>
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                      Dashboard
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                      Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                      Earnings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                      <button 
                        onClick={async () =>{
                          await logout();
                          setShowMenu(false);
                        }}>
                          Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal centrado */}
      {showLogin && !usuario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-2xl w-96 animate-fadeIn">
            <Login />
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
