import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiCheck } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { FaCcMastercard } from "react-icons/fa";
const URL = process.env.REACT_APP_BACKEND_URL;

const Billing = (hasPaid) => {
  const [warehouse, setWarehouse] = useState();
  const [username, setUsername] = useState();
  const [branchName, setBranchName] = useState();
  const [rent, setRent] = useState();
  const [rent_due, setRent_due] = useState();
  const [rent_paid, setRent_paid] = useState(false);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const getWarehouse = async () => {
    try {
      const response = await axios.get(`${URL}/warehouses/warehouse?timezone=${userTimeZone}`, {
        withCredentials: true,
      });
      setWarehouse(response.data);
      setBranchName(response.data.branchname);
      setUsername(response.data.username);
      setRent(response.data.rent);
      setRent_due(response.data.rent_due);
      setRent_paid(response.data.rent_paid);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    console.log("in billing", hasPaid);
    getWarehouse();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
        <div className="flex items-center justify-start w-full">
          <FaCcMastercard size={50} className="text-blue-500 p-2" />
          <p className="text-2xl font-semibold">Billing Information</p>
        </div>
      <div className="flex flex-col justify-center md:p-5 mt-5 border shadow-md rounded-xl">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between p-5 w-full">
            <p className="text-lg font-semibold">Username:</p>
            <p className="text-lg">{username}</p>
          </div>
          <div className="flex items-center justify-between p-5 w-full">
            <p className="text-lg font-semibold">Branch Name:</p>
            <p className="text-lg">{branchName}</p>
          </div>
          <div className="flex items-center justify-between p-5 w-full">
            <p className="text-lg font-semibold">Rent:</p>
            <p className="text-lg">PKR {rent}/-</p>
          </div>
          <div className="flex items-center justify-between p-5 w-full">
            <p className="text-lg font-semibold">Rent Due:</p>
            <p className="text-lg">{formatDate(rent_due)}</p>
          </div>
          <div className="flex items-center justify-between p-5 w-full">
            <p className="text-lg font-semibold">Rent Paid:</p>
            <p className="text-lg">
              {rent_paid ? (
                <BiCheck
                  size={25}
                  className="text-green-500 bg-green-50 border-2 rounded-full"
                />
              ) : (
                <FiX
                  size={25}
                  className="text-red-500 bg-red-50 border-2 rounded-full"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
