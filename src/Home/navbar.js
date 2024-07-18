import React from "react";
import Logo from "../Assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-50 p-4 sticky top-0 z-10 shadow-md flex justify-between">
      <div className="flex items-center justify-start md:gap-10 md:ml-10">
        <img src={Logo} alt="Logo" className="w-12" />
        <h1 className="text-lg md:text-2xl font-bold">
          Nimbus<span className="text-blue-500">360</span>Solutions
        </h1>
      </div>
      <ul className="navbar flex justify-between items-center">
        <li>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-5 py-2 md:mr-5 hover:bg-blue-600"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
