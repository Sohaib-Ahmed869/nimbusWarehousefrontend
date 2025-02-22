import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
const URL = process.env.REACT_APP_BACKEND_URL;

const Clients = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [clients, setClients] = useState([]);
  const [mobileView, setMobileView] = useState(false);

  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const addClient = async () => {
    if (!name || !address || !phone) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/clients/add`,
        {
          name,
          address,
          phone,
        },
        {
          withCredentials: true,
        }
      );
      setName("");
      setAddress("");
      setPhone("");

      alert("Client added successfully!");
      setShowAddClientModal(false);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(`${URL}/clients`, {
        withCredentials: true,
      });
      setClients(response.data);
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
    getClients();
  }, [clients]);

  return (
    <div className="flex flex-col p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold">Clients</p>
        <button
          className=" text-blue-500 mx-5 flex items-center justify-center hover:text-blue-700"
          style={{ border: "none" }}
          onClick={() => setShowAddClientModal(true)}
        >
          <BiPlus className="w-5 h-5" />
          Add Client
        </button>
      </div>
      <div className="flex flex-col justify-center p-5 mt-5 border shadow-md rounded-xl">
        <div className="table w-full p-5">
          <div className="table-row-group">
            <div
              className="table-row text-white"
              style={{ backgroundColor: "#198e7d" }}
            >
              <div className="table-cell border p-2">Client Name</div>
              <div className="table-cell border p-2">Address</div>
              <div className="table-cell border p-2">Phone</div>
            </div>
            {clients.map((client) => (
              <div
                className="table-row hover:cursor-pointer hover:bg-gray-100"
                key={client._id}
              >
                <div className="table-cell p-2 border border-r-0">
                  {client.name}
                </div>
                <div className="table-cell p-2 border border-l-0 border-r-0">
                  {client.address}
                </div>
                <div className="table-cell p-2 border border-l-0">
                  {client.phone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        show={showAddClientModal}
        onHide={() => setShowAddClientModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl shadow-xl z-50 bg-white modal"
        style={{ width: mobileView ? "90%" : "33%" }}
      >
        <Modal.Header>
          <Modal.Title>
            <p className="text-2xl font-bold text-center md:text-left p-5">Add Client</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col w-full p-5 modalbody">
            <div className="flex md:flex-row flex-col items-center gap-2 w-full">
              <div className="w-full">
                <p className="text-sm text-gray-500">Client Name</p>
                <div className="w-full flex items-center border-2 border-gray-300 rounded-full p-3 mt-2">
                  <input
                    type="text"
                    className="w-full"
                    placeholder="Client Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm text-gray-500">Address</p>
                <div className="w-full flex items-center border-2 border-gray-300 rounded-full p-3 mt-2">
                  <input
                    type="text"
                    className="w-full"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 md:mt-5">Phone</p>
            <div className="w-full flex items-center border-2 border-gray-300 rounded-full p-3 mt-2">
              <input
                type="text"
                className="w-full"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white rounded-full p-3 mt-5"
              onClick={addClient}
            >
              Add Client
            </button>
            <button
              className="w-full bg-red-500 text-white rounded-full p-3 mt-5"
              onClick={() => setShowAddClientModal(false)}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default Clients;
