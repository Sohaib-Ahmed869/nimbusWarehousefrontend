import React, { useEffect, useState } from "react";
import Logo from "../Assets/Logo.png";
import dashboard from "../Assets/dashboard.png";
import { FiBarChart } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { FiSlack } from "react-icons/fi";
import { FiCornerRightUp } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { BiCartAdd } from "react-icons/bi";

import { Modal } from "react-bootstrap";
import "./dashboardLayout.css";
import Clients from "./client";
import AddProductRate from "./addProductRate";
import AddProduct from "./addproduct";
import Outbound from "./outbound";
import Dashboard from "../warehouse/dashboard";
import OutboundNoClient from "./outboundNoClient";

const CashierDashboardLayout = () => {
  const [warehouseToken, setWarehouseToken] = useState(
    localStorage.getItem("cashiertoken") || null
  );
  const [activeOption, setActiveOption] = useState("Dashboard");
  const onLogout = () => {
    localStorage.removeItem("cashiertoken");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!warehouseToken) {
      setShowSignInModal(true);
    }
  }, [warehouseToken]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <div className="flex flex-row w-full">
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {warehouseToken && (
        <div className="w-1/6 bg-white border-r border-black">
          <div className="w-full flex items-center justify-center">
            <img src={Logo} alt="logo" className="w-20 m-5" />
          </div>
          <div
            className="flex flex-col items-start justify-center font text-md"
            style={{ color: "#2e408b" }}
          >
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Dashboard" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Dashboard")}
            >
              <FiBarChart className="w-4 mr-2" />
              <p>Dashboard</p>
            </div>

            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Inbound" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Inbound")}
            >
              <FiCornerRightUp className="w-4 mr-2" />
              <p className="">Outbound</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "OutBoundNoClient" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("OutBoundNoClient")}
            >
              <MdOutlineRecordVoiceOver className="w-4 mr-2" />
              <p className="">Outbound No Client</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Clients" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Clients")}
            >
              <FiUsers className="w-4 mr-2" />
              <p className="">Clients</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Schedule" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Schedule")}
            >
              <FaCcMastercard className="w-4 mr-2" />
              <p className="">Rate List</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Add Product" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Add Product")}
            >
              <BiCartAdd className="w-4 mr-2" />
              <p className="">Products</p>
            </div>

            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold`}
              onClick={() => setShowLogoutModal(true)}
            >
              <FiLogOut className="w-4 mr-2" />
              <p className="">Logout</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-5/6 bg-white">
        <Modal
          show={showLogoutModal}
          onHide={() => setShowLogoutModal(false)}
          centered
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="text-2xl font-bold">Logout</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-gray-500 mt-5">
              Are you sure you want to logout?
            </p>
            <div className="w-full flex flex-col items-center justify-center mt-5">
              <button
                className="bg-red-500 text-white p-2 rounded-md mt-2 w-full hover:bg-red-700"
                onClick={onLogout}
              >
                Logout
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded-md mt-2 w-full hover:bg-gray-600"
                onClick={() => setShowLogoutModal(false)}
              >
                Close
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={showSignInModal}
          onHide={() => setShowSignInModal(false)}
          centered
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10"
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-2xl font-bold">Please Sign In to Continue</p>
            <div className="w-full flex flex-col items-center justify-center mt-5">
              <button
                className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full hover:bg-blue-700"
                onClick={() => (window.location.href = "/login")}
              >
                Sign In
              </button>
            </div>
          </Modal.Body>
        </Modal>

        {warehouseToken &&
          {
            Dashboard: <Dashboard />,
            Inbound: <Outbound />,
            Clients: <Clients />,
            Schedule: <AddProductRate />,
            "Add Product": <AddProduct />,
            Profile: <p>Profile</p>,
            Billing: <p>Billing</p>,
            OutBoundNoClient: <OutboundNoClient />,
          }[activeOption]}
      </div>
    </div>
  );
};

export default CashierDashboardLayout;
