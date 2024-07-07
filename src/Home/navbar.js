import React from "react";
import Logo from "../Assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-50 p-4 sticky top-0 z-10 shadow-md flex justify-between">
      <div className="flex items-center gap-10 ml-10">
        <img src={Logo} alt="Logo" className="w-12" />
        <h1 className="text-2xl font-bold">
          Nimbus<span className="text-blue-500">360</span>Warehouse Solutions
        </h1>
      </div>
      <ul className="navbar flex justify-between items-center">
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
