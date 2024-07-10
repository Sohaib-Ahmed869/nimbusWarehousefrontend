import React, { useState } from "react";
import axios from "axios";
import Logo from "../Assets/LogoWhite.png";
import { CiMail } from "react-icons/ci";
import { BiLock } from "react-icons/bi";
import { FaHouseCircleCheck } from "react-icons/fa6";
const URL = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branchname, setBranchname] = useState("");

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword || !branchname) {
      alert("Please fill all the fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${URL}/auth/signup`, {
        email,
        username,
        password,
        branchname,
      });

      alert("Signup successful!");
      window.location.href = "/login";
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="login flex items-center justify-center min-h-screen w-full p-5">
      <div className="login_container flex flex-col justify-center items-center ">
        <img src={Logo} alt="logo" className="h-36" />
        <p className="text-xl font-bold italic">
          Welcome to NimbusWarehouse360 solution
        </p>
        <p className="text-sm text-gray-500 mt-2 italic">Create your account</p>
        <div className="flex flex-col w-full mt-5">
          <p className="text-sm text-gray-500">Email</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <CiMail size={22} className="mr-7 ml-1" />
            <input
              type="email"
              className="w-full"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-5">Username</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <CiMail size={22} className="mr-7 ml-1" />
            <input
              type="username"
              className="w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-5">Password</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <BiLock size={22} className="mr-7 ml-1 text-blue-400" />
            <input
              type="password"
              className="w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-5">Confirm Password</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <BiLock size={22} className="ml-1 mr-7" />
            <input
              type="password"
              className="w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-5">Branch Name</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <FaHouseCircleCheck size={22} className="mr-7 ml-1" />
            <input
              type="text"
              className="w-full"
              placeholder="Branch Name"
              value={branchname}
              onChange={(e) => setBranchname(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full bg-blue-400 text-white p-3 mt-10 rounded-full"
          onClick={handleSignup}
        >
          Signup
        </button>
        <p className="text-sm text-gray-500 mt-5 italic">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
