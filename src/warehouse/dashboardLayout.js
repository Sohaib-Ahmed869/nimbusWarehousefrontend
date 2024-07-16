import useStore from "../Store/store";
import React, { useEffect, useState } from "react";
import Logo from "../Assets/Logo.png";
import dashboard from "../Assets/dashboard.png";
import { FiBarChart } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import { FiSlack } from "react-icons/fi";
import { FiCornerRightDown, FiCornerRightUp } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { BiCartAdd } from "react-icons/bi";
import { BsList } from "react-icons/bs";

import Dashboard from "./dashboard";
import AddProduct from "./addproduct";
import Inbound from "./inbound";
import Outbound from "../cashier/outbound";
import OutboundNoClient from "../cashier/outboundNoClient";
import Clients from "./client";
import AddProductRate from "./addProductRate";
import Settings from "./settings";
import Profile from "./Profile";
import Billing from "./billing";
import CashierAdd from "./CashierAdd";
import CashierManagement from "./CashierManagement";
import Statistics from "./statistics";
import { Modal } from "react-bootstrap";
import { CiSettings } from "react-icons/ci";

import "./dashboardLayout.css";

const DashboardLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const { userRole, setUserRole } = useStore();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [activeOption, setActiveOption] = useState("Dashboard");

  const onLogout = () => {
    setUserRole(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    setShowSignInModal(false);
    console.log("userRole", userRole);
    console.log("show pop: ", showSignInModal);
    if (userRole == null || userRole == "null" || userRole != "tenant") {
      console.log("inside if");
      console.log("userRole", userRole);
      console.log("show pop: ", showSignInModal);
      setShowSignInModal(true);
      return;
    }
  }, [userRole]);

  useEffect(() => {
    console.log(sidebarVisible);
  }, [sidebarVisible]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileView(true);
      setSidebarVisible(false);
    } else {
      setMobileView(false);
    }
  }, [window.innerWidth]);

  return (
    <div className="flex flex-row w-full">
      <div className="flex text-right">
        <BsList
          className="absolute w-10 h-10  cursor-pointer"
          onClick={() => {
            if (!mobileView) {
              setSidebarVisible(!sidebarVisible);
              setMobileView(false);
              setShowMobileMenu(false);
            }
            if (mobileView) {
              setShowMobileMenu(!showMobileMenu);
              setSidebarVisible(false);
            }
          }}
        />
      </div>
      {showMobileMenu && (
        <div className="absolute top-5 left-5 mobile-menu z-30 bg-white shadow-lg">
          <div className="flex flex-col items-end justify-end">
            <div
              clas6sName="flex flex-col items-end justify-center font text-md"
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
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4  ${
                  activeOption === "Statistics" ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveOption("Statistics")}
              >
                <FiSlack className="w-4 mr-2" />
                <p className="">Statistics</p>
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
                  activeOption === "OutboundNoClient" ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveOption("OutboundNoClient")}
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
                <p className="">Rate Management</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "Add Product" ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveOption("Add Product")}
              >
                <BiCartAdd className="w-4 mr-2" />
                <p className="">Product Management</p>
              </div>

              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                  activeOption === "CashierDelete" ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveOption("CashierDelete")}
              >
                <MdOutlineRecordVoiceOver className="w-4 mr-2" />
                <p className="">Manage Cashiers</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold ${
                  activeOption === "Profile" ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveOption("Profile")}
              >
                <FiUser className="w-4 mr-2" />
                <p className="">Profile</p>
              </div>
              <div
                className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold ${
                  activeOption === "Billing" ? "bg-gray-300" : ""
                }`}
                onClick={() => setActiveOption("Billing")}
              >
                <FaWallet className="w-4 mr-2" />
                <p className="">Billing</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {userRole != null && userRole != "null" && userRole == "tenant" && (
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
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4  ${
                activeOption === "Statistics" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Statistics")}
            >
              <FiSlack className="w-4 mr-2" />
              <p className="">Statistics</p>
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
                activeOption === "OutboundNoClient" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("OutboundNoClient")}
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
              <p className="">Rate Management</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "Add Product" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Add Product")}
            >
              <BiCartAdd className="w-4 mr-2" />
              <p className="">Product Management</p>
            </div>

            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold pl-4 ${
                activeOption === "CashierDelete" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("CashierDelete")}
            >
              <MdOutlineRecordVoiceOver className="w-4 mr-2" />
              <p className="">Manage Cashiers</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold ${
                activeOption === "Profile" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Profile")}
            >
              <FiUser className="w-4 mr-2" />
              <p className="">Profile</p>
            </div>
            <div
              className={`flex items-center gap-2 w-full hover:bg-gray-300 p-4 cursor-pointer hover:font-semibold ${
                activeOption === "Billing" ? "bg-gray-300" : ""
              }`}
              onClick={() => setActiveOption("Billing")}
            >
              <FaWallet className="w-4 mr-2" />
              <p className="">Billing</p>
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10 modalbody"
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

        {userRole != null &&
          userRole != "null" &&
          userRole == "tenant" &&
          {
            Dashboard: <Dashboard />,
            Statistics: <Statistics />,
            Inbound: <Inbound />,
            Outbound: <Outbound />,
            OutboundNoClient: <OutboundNoClient />,
            Clients: <Clients />,
            Schedule: <AddProductRate />,
            "Add Product": <AddProduct />,
            // Settings: <Settings />,
            CashierAdd: <CashierAdd />,
            CashierDelete: <CashierManagement />,
            Profile: <Profile />,
            Billing: <Billing />,
          }[activeOption]}
      </div>
    </div>
  );
};

export default DashboardLayout;
