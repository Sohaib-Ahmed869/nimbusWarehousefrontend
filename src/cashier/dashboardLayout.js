import useStore from "../Store/store";
import React, { useEffect, useRef, useState, userRef } from "react";
import Logo from "../Assets/Logo.png";
import dashboard from "../Assets/dashboard.png";
import { FiBarChart } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { FiSlack } from "react-icons/fi";
import { FiCornerRightUp, FiCornerRightDown } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { BiCartAdd } from "react-icons/bi";
import { BsList } from "react-icons/bs";

import { Modal } from "react-bootstrap";
import "./dashboardLayout.css";
import Clients from "./client";
import AddProductRate from "./addProductRate";
import AddProduct from "./addproduct";
import Outbound from "./outbound";
import Dashboard from "../warehouse/dashboard";
import OutboundNoClient from "./outboundNoClient";
import Inbound from "../warehouse/inbound";

const CashierDashboardLayout = () => {
  const [activeOption, setActiveOption] = useState("Dashboard");
  const [mobileView, setMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { userRole, setUserRole } = useStore();
  const menuRef = useRef();

  const onLogout = () => {
    setUserRole(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    setShowSignInModal(false);
    console.log("userRole", userRole);
    console.log("show pop: ", showSignInModal);
    if (userRole == null || userRole == "null" || userRole != "cashier") {
      console.log("inside if");
      console.log("userRole", userRole);
      console.log("show pop: ", showSignInModal);
      setShowSignInModal(true);
      return;
    }
  }, [userRole]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileView(true);
      setSidebarVisible(false);
    } else {
      setMobileView(false);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    }

    document.addEventListener("touchstart", handleClickOutside);
    return () => document.removeEventListener("touchstart", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="flex flex-row w-full">
      <div className="flex text-right">
        <BsList
          className="absolute w-10 h-10 cursor-pointer"
          onClick={() => {
            if (!mobileView) {
              setSidebarVisible(!sidebarVisible);
              setShowMobileMenu(false);
            }
            if (mobileView) {
              setSidebarVisible(false);
              setShowMobileMenu(!showMobileMenu);
            }
          }}
        />
      </div>
      {showMobileMenu && (
        <div
          className="absolute top-5 left-5 mobile-menu z-30 bg-white shadow-lg"
          ref={menuRef}
        >
          <div className="flex flex-col items-end justify-end">
            <div
              className="flex flex-col items-end justify-center font text-md"
              style={{ color: "#2e408b" }}
            >
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Dashboard" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("Dashboard");
                  setShowMobileMenu(false);
                }}
              >
                <FiBarChart className="w-4 mr-2" />
                <p>Dashboard</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Inbound" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("Inbound");
                  setShowMobileMenu(false);
                }}
              >
                <FiCornerRightDown className="w-4 mr-2" />
                <p className="">Inbound</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Outbound" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("Outbound");
                  setShowMobileMenu(false);
                }}
              >
                <FiCornerRightUp className="w-4 mr-2" />
                <p className="">Outbound</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "OutboundNoClient" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("OutboundNoClient");
                  setShowMobileMenu(false);
                }}
              >
                <MdOutlineRecordVoiceOver className="w-4 mr-2" />
                <p className="">Outbound No Client</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Clients" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("Clients");
                  setShowMobileMenu(false);
                }}
              >
                <FiUsers className="w-4 mr-2" />
                <p className="">Clients</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Schedule" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("Schedule");
                  setShowMobileMenu(false);
                }}
              >
                <FaCcMastercard className="w-4 mr-2" />
                <p className="">Rate List</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Add Product" ? "bg-gray-300" : ""
                }`}
                onClick={() => {
                  setActiveOption("Add Product");
                  setShowMobileMenu(false);
                }}
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
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30"></div>
      )}
      {userRole != null && userRole != "null" && userRole == "cashier" && (
        <div
          className={` bg-white border-r w-1/6 border-black sidebar ${
            !sidebarVisible ? "hidden" : "" || mobileView ? "hidden" : ""
          } h-screen max-h-screen overflow-y-auto no-scrollbar`}
        >
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
              <FiCornerRightDown className="w-4 mr-2" />
              <p className="">Inbound</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Outbound" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Outbound")}
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
      <div
        className={`bg-white 
          ${mobileView ? "w-full" : !sidebarVisible ? "w-full" : "w-5/6"}`}
      >
        <Modal
          show={showLogoutModal}
          onHide={() => setShowLogoutModal(false)}
          centered
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-5 modal modalbody"
          style={{ width: mobileView ? "90%" : "33%" }}
        >
          <Modal.Header >
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-40 bg-white p-5 modal modalbody"
          style={{ width: mobileView ? "90%" : "33%" }}
        >
          <Modal.Header >
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

        {userRole != null &&
          userRole != "null" &&
          userRole == "cashier" &&
          {
            Dashboard: <Dashboard />,
            Inbound: <Inbound />,
            Outbound: <Outbound />,
            OutboundNoClient: <OutboundNoClient />,
            Clients: <Clients />,
            Schedule: <AddProductRate />,
            "Add Product": <AddProduct />,
            Profile: <p>Profile</p>,
            Billing: <p>Billing</p>,
          }[activeOption]}
      </div>
    </div>
  );
};

export default CashierDashboardLayout;
