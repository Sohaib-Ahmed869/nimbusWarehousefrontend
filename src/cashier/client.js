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
    getClients();
  }, [clients]);

  return (
    <div className="flex flex-col w-full min-h-screen p-5">
      <div className="flex flex-col justify-center p-5 border shadow-md rounded-xl">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Clients</p>
          <button
            className=" text-blue-500 p-3 ml-5 flex items-center justify-center hover:text-blue-700"
            style={{ border: "none" }}
          >
            For a new client, Contact the admininstrator
          </button>
        </div>

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
    </div>
  );
};

export default Clients;
