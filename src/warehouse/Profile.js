import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BiUser } from "react-icons/bi";
import "./dashboard.css";
const URL = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [warehouse, setWarehouse] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [branchName, setBranchName] = useState();
  const [warehouseId, setWarehouseId] = useState();
  const [mobileView, setMobileView] = useState(false);

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBranchNameModal, setShowBranchNameModal] = useState(false);

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`${URL}/warehouses/get-warehouse`, {
        withCredentials: true,
      });
      setWarehouse(response.data);
      setWarehouseId(response.data._id);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    getWarehouse();
  }, [showUsernameModal, showPasswordModal, showBranchNameModal]);

  const updateWarehouseUsername = async () => {
    if (!username) {
      alert("Please enter the username!");
      return;
    }
    try {
      const response = await axios.put(
        `${URL}/warehouses/update-username`,
        {
          username: username,
        },
        {
          withCredentials: true,
        }
      );
      alert("Username updated successfully!");
      setShowUsernameModal(false);
      setUsername("");
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
        `${URL}/warehouses/update-password`,
        {
          password: password,
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

  const updateWarehouseBranchName = async () => {
    if (!branchName) {
      alert("Please enter the branch name!");
      return;
    }
    try {
      const response = await axios.put(
        `${URL}/warehouses/update-branchname`,
        {
          branchname: branchName,
        },
        {
          withCredentials: true,
        }
      );
      alert("Branch name updated successfully!");
      setShowBranchNameModal(false);
      setBranchName("");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      {(showBranchNameModal || showPasswordModal || showUsernameModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="flex items-center justify-start w-full">
        <BiUser size={30} className="text-blue-500 mr-3" />
        <p className="text-3xl font-semibold">Profile</p>
      </div>
      <div className="flex flex-col justify-center p-5 mt-5 border shadow-md rounded-xl">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between p-0 md:p-5 w-full md:hover:border md:hover:shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row">
              <p className="text-lg font-semibold">Username: </p>
              <span className="text-md ml-2 underline font-normal">
                {warehouse?.username}
              </span>
            </div>
            <button
              className="text-blue-500 flex items-center justify-center hover:text-blue-700"
              style={{ border: "none" }}
              onClick={() => setShowUsernameModal(true)}
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between p-0 md:p-5 w-full md:hover:border md:hover:shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row">
              <p className="text-lg font-semibold">Password: </p>
              <span className="text-md ml-2 font-normal">********</span>
            </div>
            <button
              className="text-blue-500 flex items-center justify-center hover:text-blue-700"
              style={{ border: "none" }}
              onClick={() => setShowPasswordModal(true)}
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between p-0 md:p-5 w-full md:hover:border md:hover:shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row">
              <p className="text-lg font-semibold">Branch Name: </p>
              <span className="text-md ml-2 font-normal">
                {warehouse?.branchname}
              </span>
            </div>
            <button
              className="text-blue-500 flex items-center justify-center hover:text-blue-700"
              style={{ border: "none" }}
              onClick={() => setShowBranchNameModal(true)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showUsernameModal}
        onHide={() => setShowUsernameModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10 modal modalbody"
        style={{ width: mobileView ? "90%" : "33%" }}
      >
        <Modal.Header  >
          <Modal.Title>Update Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter new username"
            className="w-full p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white p-2 rounded-md w-full mt-5"
            onClick={updateWarehouseUsername}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md w-full mt-5"
            onClick={() => setShowUsernameModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10 modal modalbody"
        style={{ width: mobileView ? "90%" : "33%" }}
      >
        <Modal.Header  >
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white p-2 rounded-md w-full mt-5"
            onClick={updateWarehousePassword}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md w-full mt-5"
            onClick={() => setShowPasswordModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showBranchNameModal}
        onHide={() => setShowBranchNameModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10 modal modalbody"
        style={{ width: mobileView ? "90%" : "33%" }}
      >
        <Modal.Header  >
          <Modal.Title>Update Branch Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter new branch name"
            className="w-full p-2 border rounded-md"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-blue-500 text-white p-2 rounded-md w-full mt-5"
            onClick={updateWarehouseBranchName}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md w-full mt-5"
            onClick={() => setShowBranchNameModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
