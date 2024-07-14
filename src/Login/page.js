import React, { useState } from "react";
import Logo from "../Assets/LogoWhite.png";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { BiLock } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import "./login.css";
import useStore from "../Store/store";

const URL = process.env.REACT_APP_BACKEND_URL;
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [email, setEmail] = useState("");

  const [showOTPModal, setShowOTPModal] = useState(false);

  const [generatedOTP, setGeneratedOTP] = useState(generateOTP());

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const { userRole, setUserRole } = useStore();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const sendOTP = async () => {
    if (!email) {
      alert("Please enter the email!");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/email/send`,
        {
          email,
          otp: generatedOTP,
        },
        {
          withCredentials: true,
        }
      );
      alert("OTP sent successfully!");
      setShowForgetPasswordModal(false);
      setShowOTPModal(true);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const updateWarehousePassword = async () => {
    if (!password) {
      alert("Please enter the password!");
      return;
    }
    try {
      console.log(password);
      const response = await axios.put(
        `${URL}/warehouses/update-password2`,
        {
          email,
          password: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      alert("Password updated successfully!");
      setShowPasswordModal(false);
      setPassword("");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const [Verify, setVerify] = useState(false);

  const onClickVerify = () => {
    if (otp.join("") === generatedOTP.toString()) {
      setVerify(true);
      alert("OTP verified successfully!");
      setShowOTPModal(false);
      setShowPasswordModal(true);
    } else {
      alert("Invalid OTP!");
    }
  };

  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUsername("");
      setPassword("");

      console.log("login role: ", response.data.role);
      setUserRole(response.data.role);

      alert("Login successful!");
      window.location.href = "/warehouseDashboard";
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div
      className={`login flex items-center justify-center min-h-screen w-full pb-5`}
    >
      {(showForgetPasswordModal || showOTPModal || showPasswordModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="login_container flex flex-col justify-center items-center w-1/3">
        <img src={Logo} alt="logo" className="h-36" />
        <p className="text-3xl font-bold mt-0">Welcome Back</p>
        <p className="text-sm text-gray-500 mt-2">Login to your account</p>
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
        <p className="text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign Up
          </span>
        </p>
        <p
          className="text-sm text-gray-500 mt-5"
          onClick={() => (window.location.href = "/cashierLogin")}
        >
          Are you a Cashier?{" "}
          <span className="text-blue-400 cursor-pointer">Click Here</span>
        </p>
      </div>
      {showForgetPasswordModal && showOTPModal && showPasswordModal && (
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
          <p className="text-sm text-gray-800">Email</p>
          <div className="w-full flex  items-center border border-gray-300 rounded-md p-2 mt-2">
            <input
              type="email"
              className="w-full"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-400 text-white p-2 rounded-full w-full mt-10"
            onClick={() => sendOTP()}
          >
            Reset Password
          </button>
          <button
            className="bg-red-400 text-white p-2 rounded-full w-full mt-5"
            onClick={() => setShowForgetPasswordModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOTPModal}
        onHide={() => setShowOTPModal(false)}
        centered
        className="bg-white p-10 rounded-2xl w-1/2 shadow-xl z-50"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-2xl font-bold">Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login_container flex flex-col justify-center items-center">
            <img src={Logo} alt="logo" className="mb-2 h-36" />
            <p className="text-3xl font-bold">Welcome Back</p>
            <p className="text-sm text-gray-500 mt-2">
              Enter one time passcode that has been sent on your account
            </p>

            <div className="flex space-x-4 mt-6">
              {otp.map((data, index) => {
                return (
                  <input
                    className="border border-gray-400 p-3 w-14 text-center text-xl rounded-md bg-gray-100"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>

            <button
              className="w-96 bg-blue-400 text-white p-3 mt-5 rounded-full"
              onClick={onClickVerify}
            >
              Verify OTP
            </button>

            <p className="text-sm text-gray-500 mt-5">
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => (window.location.href = "/login")}
              >
                Would you rather use email and password?
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
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
            Update Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-500">New Password</p>
          <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
            <BiLock size={22} className="mr-7" />
            <input
              type="password"
              className="w-full"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-400 text-white p-2 rounded-full w-full mt-10"
            onClick={updateWarehousePassword}
          >
            Update Password
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
