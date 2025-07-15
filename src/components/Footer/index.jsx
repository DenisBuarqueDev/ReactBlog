import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 h-16 mt-5 bg-white">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2025
          <NavLink to="/" className="hover:underline">
            ReactBlog
          </NavLink>
          All Rights Reserved.
        </span>
        <ul className="flex flex-wrap gap-4 items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <NavLink to="/" className="hover:underline me-4 md:me-6">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="hover:underline me-4 md:me-6">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
