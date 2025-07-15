import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

function NavBar() {
  const { user } = useAuthValue();

  const { logout } = useAuthentication();

  return (
    <nav className="w-full py-4 bg-black">

      <div className="flex flex-col md:container md:flex-row md:justify-between md:m-auto">

        <NavLink to="/" className="text-center text-2xl font-bold text-white">
          MiniBlog
        </NavLink>
        <ul className="flex justify-between justify-items-center items-center">
          <li>
            <NavLink to="/" className="block px-3 text-white">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="block px-3 text-white">
              About
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/register" className="block px-3 text-white">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="block px-3 text-white">
                  Sing In
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/dashboard" className="block px-3 text-white">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/posts" className="block px-3 text-white">
                  Posts
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className="block px-3 text-white">
                  LogOut
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
