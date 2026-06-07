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

  // Cierra el menú al hacer clic fuera
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
        <div className="flex items-center space-x-4 px-8">
          {!usuario ? (
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-green-700 hover:ring-2 hover:ring-blue-500"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
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
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center space-x-2"
              >
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
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
                      <button onClick={logout}>Sign out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showLogin && !usuario && (
        <div className="absolute right-4 top-16 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-80">
          <Login />
        </div>
      )}
    </nav>
  );
}
