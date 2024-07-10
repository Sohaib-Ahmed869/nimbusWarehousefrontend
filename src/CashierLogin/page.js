import React, { useState } from "react";
import Logo from "../Assets/LogoWhite.png";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { BiLock } from "react-icons/bi";
import { Modal } from "react-bootstrap";

const URL = process.env.REACT_APP_BACKEND_URL;
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
const CashierLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  const [token, setToken] = useState();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post(`${URL}/auth/cashierLogin`, {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      //store token in local storage
      localStorage.setItem("cashiertoken", response.data.token);
      alert("Login successful!");
      window.location.href = "/cashierDashboard";
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className={`login flex items-center justify-center min-h-screen w-full pb-10`}>
      {(showForgetPasswordModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="login_container flex flex-col justify-center items-center w-1/3">
        <img src={Logo} alt="logo" className="h-36" />
        <p className="text-3xl font-bold mt-0">Cashier Login</p>
        <p className="text-sm text-gray-500 mt-2">
          Login to your cashier account
        </p>
        <div className="flex flex-col w-full mt-5">
          <p className="text-sm text-gray-500">Username</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <CiMail size={22} className="mr-7" />
            <input
              type="email"
              className="w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-5">Password</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <BiLock size={22} className="mr-7" />
            <input
              type="password"
              className="w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-2">
            <p
              className="text-sm text-gray-800 cursor-pointer"
              onClick={() => setShowForgetPasswordModal(true)}
            >
              Forgot Password?
            </p>
          </div>
        </div>
        <button
          className="w-full bg-blue-400 text-white p-3 mt-10 rounded-full"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm text-gray-500 mt-5" onClick={() => window.location.href = "/login"}>
          Are you a Manager?{" "}
          <span className="text-blue-400 cursor-pointer">Click Here</span>
        </p>
      </div>
      {showForgetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <Modal
        show={showForgetPasswordModal}
        onHide={() => setShowForgetPasswordModal(false)}
        centered
        className="bg-white p-10 rounded-2xl w-1/3 shadow-xl z-50"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-2xl font-bold">
            Forgot Password?
          </Modal.Title>
          <p className="text-sm text-gray-500">
            Enter email address associated with your account
          </p>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-800">
            Please Contact your System Administrator to reset your password
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-red-400 text-white p-2 rounded-full w-full mt-5"
            onClick={() => setShowForgetPasswordModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CashierLogin;
