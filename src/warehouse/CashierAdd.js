import React, { useState } from "react";
import axios from "axios";
import Logo from "../Assets/LogoWhite.png";
import { CiMail } from "react-icons/ci";
import { BiLock } from "react-icons/bi";
import { FaHouseCircleCheck } from "react-icons/fa6";
const URL = process.env.REACT_APP_BACKEND_URL;

const CashierAdd = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill all the fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/auth/cashierSignup`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      alert("Cashier account created successfully!");
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col w-full p-10">
      <p className="text-sm text-gray-500 mt-2 italic">
        Create a cashier account
      </p>
      <div className="flex flex-col w-full mt-5">
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
      </div>
      <button
        className="w-full bg-blue-400 text-white p-3 mt-10 rounded-full"
        onClick={handleSignup}
      >
        Signup
      </button>
      <p className="text-sm text-gray-500 mt-5 italic text-center">
        Provide the cashier with the username and password to login
      </p>
    </div>
  );
};

export default CashierAdd;
