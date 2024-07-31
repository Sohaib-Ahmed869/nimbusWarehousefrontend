import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiShoppingBag } from "react-icons/fi";
import { FaDollarSign, FaWarehouse } from "react-icons/fa";
import { BiStar } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import "./dashboard.css";

const URL = process.env.REACT_APP_BACKEND_URL;

const Statistics = () => {
  const [clientsStatistics, setClientStatistics] = React.useState(null);
  const [averageperClient, setAverageperClient] = useState(0);
  const [maxClient, setMaxClient] = useState("");
  const [salesThisMonth, setSalesThisMonth] = useState(0);
  const [salesThisYear, setSalesThisYear] = useState(0);
  const [salesToday, setSalesToday] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const convertNumbertoK = (number) => {
    return number > 999 ? (number / 1000).toFixed(1) + "k" : number;
  };

  React.useEffect(() => {
    axios
      .get(`${URL}/products/statistics`, { withCredentials: true })
      .then((response) => {
        setAverageperClient(response.data.averagePerClient);
        setMaxClient(response.data.maxClient);
        setSalesThisMonth(response.data.salesThisMonth);
        setSalesThisYear(response.data.salesThisYear);
        setSalesToday(response.data.salesToday);
        setTotalSales(response.data.totalSales);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${URL}/products/more-stats`, { withCredentials: true })
      .then((response) => {
        setClientStatistics(response.data);
        console.log(response.data);
      });
  }, []);

  const getClients = () => {
    axios.get(`${URL}/clients`, { withCredentials: true }).then((response) => {
      setClients(response.data);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  const getTodaySales = (name) => {
    if (!clientsStatistics) return 0;
    console.log(name);
    //client statistics is an object with keys as client names
    //and values as the sales made by the client
    console.log(clientsStatistics[name]);
    if (!clientsStatistics[name]) return 0;
    //get the sales made by the client
    return clientsStatistics[name].today;
  };

  return (
    <div className="p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      <h1 className="text-3xl font-semibold">Statistics</h1>
      <p className="text-gray-500">
        Below is the summary of your warehouse activity
      </p>
      <div className="flex flex-row gap-5 mt-5 cards">
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#208ce4" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Total Sales</p>
            <p className="text-3xl font-semibold text-white">
              {convertNumbertoK(totalSales)}
            </p>
          </div>
          <div>
            <FiShoppingBag size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#6034b4" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Sales Today</p>
            <p className="text-3xl font-semibold text-white">
              {convertNumbertoK(salesToday)}
            </p>
          </div>
          <div>
            <BsList size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#54ac58" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Sales This Month</p>
            <p className="text-3xl font-semibold text-white">
              {" "}
              {convertNumbertoK(salesThisMonth)}{" "}
            </p>
          </div>
          <div>
            <FaDollarSign size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5 mt-5 cards">
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#e3742f" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Sales This Year </p>
            <p className="text-3xl font-semibold text-white">
              {" "}
              {convertNumbertoK(salesThisYear)}
            </p>
          </div>
          <div>
            <FaWarehouse size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#2b599d" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Average per Client</p>
            <p className="text-3xl font-semibold text-white">
              {" "}
              {convertNumbertoK(averageperClient)}
            </p>
          </div>
          <div>
            <BiUser size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#3a7a8b" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Star Client</p>
            <p className="text-3xl font-semibold text-white">{maxClient}</p>
          </div>
          <div>
            <BiStar size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
      </div>
      <div className="mt-10 w-full bg-opacity-5 bg-green-800 p-5 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold">Clients Statistics</h1>
        <p className="text-gray-500">
          Below is the summary of your clients activity
        </p>
        <div className="mt-5">
          {clientsStatistics && clients && (
            <div className="flex flex-col gap-5">
              <input
                className="border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Search for a client"
                onChange={(e) => setSelectedClient(e.target.value)}
              />
              <div className="table w-full">
                <div className="table-row-group">
                  <div className="table-row bg-slate-500 bg-opacity-20">
                    <div className="table-cell font-semibold p-2">Client</div>
                    <div className="table-cell font-semibold">Today</div>
                    <div className="table-cell font-semibold">This Month</div>
                    <div className="table-cell font-semibold">This Year</div>
                    <div className="table-cell font-semibold">Total</div>
                  </div>
                  {Object.keys(clientsStatistics)
                    .filter((client) =>
                      client
                        .toLowerCase()
                        .includes(selectedClient.toLowerCase())
                    )
                    .map((client) => (
                      <div
                        key={client}
                        className="table-row hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="table-cell p-2">{client}</div>
                        <div className="table-cell">
                          {convertNumbertoK(clientsStatistics[client].today)}
                        </div>
                        <div className="table-cell">
                          {convertNumbertoK(
                            clientsStatistics[client].thisMonth
                          )}
                        </div>
                        <div className="table-cell">
                          {convertNumbertoK(clientsStatistics[client].thisYear)}
                        </div>
                        <div className="table-cell">
                          {convertNumbertoK(clientsStatistics[client].total)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
