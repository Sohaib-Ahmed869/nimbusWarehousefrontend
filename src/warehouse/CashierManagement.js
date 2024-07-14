import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalBody } from "react-bootstrap";
import { FiTrash } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import CashierAdd from "./CashierAdd";
import { BiPlus } from "react-icons/bi";

const URL = process.env.REACT_APP_BACKEND_URL;

const CashierDelete = () => {
  const [cashiers, setCashiers] = useState([]);

  const [cashierDeleteModal, setCashierDeleteModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [showAddCashierModal, setShowAddCashierModal] = useState(false);

  const [cashierId, setCashierId] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL}/cashiers/delete/${id}`, {
        withCredentials: true,
      });

      alert("Cashier account deleted successfully!");
      setCashierDeleteModal(false);
      fetchCashiers();
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const fetchCashiers = async () => {
    try {
      const response = await axios.get(`${URL}/cashiers`, {
        withCredentials: true,
      });

      setCashiers(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.put(
        `${URL}/cashiers/update-password/${cashierId}`,
        {
          password: updatedPassword,
        },
        {
          withCredentials: true,
        }
      );

      alert("Password updated successfully!");
      setUpdatedPassword("");
      setUpdatePasswordModal(false);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="flex  justify-center min-h-screen w-full p-10">
      <div className="login_container flex flex-col items-center w-full">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">View and manage cashier accounts</p>
          <button
            className="text-blue-500 p-3 ml-5 flex items-center justify-center hover:text-blue-700"
            style={{ border: "none" }}
            onClick={() => setShowAddCashierModal(true)}
          >
            <BiPlus className="w-6 border rounded-full border-gray-300 h-6 text-blue-500 me-2" />
            Add Cashier
          </button>
        </div>
        <div className="flex flex-col w-full mt-5">
          <p className="text-sm text-gray-500 mt-5 mb-5">Cashiers</p>
          <div className="w-full table">
            <table className="w-full">
              <thead>
                <tr
                  className="table-row text-white text-left"
                  style={{ backgroundColor: "#198e7d" }}
                >
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Password</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cashiers.map((cashier) => (
                  <tr
                    key={cashier._id}
                    className="table-row hover:cursor-pointer hover:bg-gray-100"
                  >
                    <td className="border p-2 border-r-0">
                      {cashier.username}
                    </td>
                    <td className="border-l-0 border-r-0 p-2">************</td>
                    <td className="border p-2 border-l-0 text-center">
                      <button
                        className="bg-blue-500 me-2 text-white p-2 rounded-md mt-2 hover:bg-blue-700"
                        onClick={() => {
                          setCashierId(cashier._id);
                          setUpdatePasswordModal(true);
                        }}
                      >
                        <FiEdit3 className="w-4" />
                      </button>

                      <button
                        className="bg-red-500 text-white p-2 rounded-md mt-2 hover:bg-red-700"
                        onClick={() => {
                          setCashierId(cashier._id);
                          setCashierDeleteModal(true);
                        }}
                      >
                        <FiTrash className="w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        show={cashierDeleteModal}
        onHide={() => setCashierDeleteModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10 modalbody"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-2xl font-bold">Delete Cashier Account</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this cashier account?
          </p>
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <button
              className="bg-red-500 text-white p-2 rounded-md mt-2 w-full hover:bg-red-700"
              onClick={() => handleDelete(cashierId)}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-md mt-2 w-full hover:bg-gray-600"
              onClick={() => setCashierDeleteModal(false)}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={updatePasswordModal}
        onHide={() => setUpdatePasswordModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10 modalbody"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-2xl font-bold">Update Password</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-500 mt-5">Enter new password</p>
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <input
              type="password"
              className="w-full border-2 border-gray-300 rounded-full p-3 mt-2"
              placeholder="New Password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full hover:bg-blue-700"
              onClick={() => handleUpdatePassword()}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-md mt-2 w-full hover:bg-gray-600"
              onClick={() => setUpdatePasswordModal(false)}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showAddCashierModal}
        onHide={() => setShowAddCashierModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl items-center justify-center flex flex-col shadow-xl z-50 bg-white p-10"
        style={{ height: "100%", overflowY: "scroll" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <button
              onClick={() => {
                setShowAddCashierModal(false);
                fetchCashiers();
              }}
              className="absolute top-10 right-10"
            >
              x
            </button>
          </Modal.Title>
        </Modal.Header>
        <ModalBody className="w-full">
          <CashierAdd />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CashierDelete;
