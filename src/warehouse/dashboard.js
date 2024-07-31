import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import axios from "axios";
import { FiShoppingBag } from "react-icons/fi";
import { FaWarehouse } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import dashboard from "../Assets/Logo.png";
import profilepic from "../Assets/LogoWhite.png";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { easingEffects } from "chart.js/helpers";
import "./dashboard.css";
const URL = process.env.REACT_APP_BACKEND_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [salesDataByProduct, setSalesDataByProduct] = useState({
    labels: [],
    datasets: [],
  });
  const [activitiesDates, setActivitiesDates] = useState([]);
  const [inboundLogs, setInboundLogs] = useState([]);
  const [outboundLogs, setOutboundLogs] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllInboundLogs = async () => {
    try {
      const response = await axios.get(`${URL}/products/inbound-logs?timezone=${userTimeZone}`, {
        withCredentials: true,
      });

      // sort on base of date
      response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setInboundLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllOutboundLogs = async () => {
    try {
      const response = await axios.get(`${URL}/products/outbound-logs?timezone=${userTimeZone}`, {
        withCredentials: true,
      });

      // sort on base of date
      response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOutboundLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalSales = async () => {
    try {
      const response = await axios.get(`${URL}/products/total-sales`, {
        withCredentials: true,
      });
      setTotalSales(response.data.totalSales);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalSales();
  }, []);

  useEffect(() => {
    getAllInboundLogs();
    getAllOutboundLogs();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);
  
  useEffect(() => {
    const stock = products.reduce((acc, product) => acc + product.stock, 0);
    setTotalStock(stock);
  }, [products]);

  useEffect(() => {
    const uniqueDates = [
      ...new Set(inboundLogs.map((log) => log.date.split("T")[0])),
    ];
    //get the unique dates
    setActivitiesDates(uniqueDates);
    //sort dates by descending order
    setActivitiesDates((dates) =>
      dates.sort((a, b) => new Date(b) - new Date(a))
    );
  }, [inboundLogs]);

  const [outboundDates, setOutboundDates] = useState([]);

  useEffect(() => {
    const uniqueDates = [
      ...new Set(outboundLogs.map((log) => log.date.split("T")[0])),
    ];
    //get the unique dates
    setOutboundDates(uniqueDates);
    //sort dates by descending order
    setOutboundDates((dates) =>
      dates.sort((a, b) => new Date(b) - new Date(a))
    );
  }, [outboundLogs]);

  const getWeekDay = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(date);
    return days[d.getDay()];
  };

  const processSalesData = (logs) => {
    const salesByDate = {};

    logs.forEach((log) => {
      const date = log.date.split("T")[0];
      if (!salesByDate[date]) {
        salesByDate[date] = 0;
      }
      salesByDate[date] += log.total;
    });

    const labels = Object.keys(salesByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const data = labels.map((date) => salesByDate[date]);

    setSalesData({
      labels,
      datasets: [
        {
          label: "Sales",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(40, 140, 228, 0.1)",
          fill: true,
        },
      ],
    });
  };

  const processSalesDataByProduct = (logs) => {
    const salesByProduct = {};

    logs.forEach((log) => {
      const products = log.productNames;
      //get the count of products
      products.forEach((product) => {
        if (!salesByProduct[product]) {
          salesByProduct[product] = 0;
        }
        salesByProduct[product] += 1;
      });
    });

    const labels = Object.keys(salesByProduct);
    const data = labels.map((product) => salesByProduct[product]);

    setSalesDataByProduct({
      labels,
      datasets: [
        {
          label: "Sales",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    });
  };

  const barChartOptions = {
    animation: {
      duration: 100, // Speed up the animation
      easingEffects: "easeInOutQuad",
      easing: "easeInOutQuad",
    },
  };

  const chartOptions = {
    animation: {
      duration: 30, // Speed up the animation
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        ticks: {
          stepSize: 30000,
        },
      },
    },
  };

  useEffect(() => {
    processSalesData(outboundLogs);
    processSalesDataByProduct(outboundLogs);
  }, [outboundLogs, products]);

  return (
    <div className="p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-gray-500">
        Below is the summary of your team activity
      </p>
      <div className="gap-5 mt-5 cards">
        <div
          className="relative flex w-1/3 p-5 rounded-lg shadow-md items-center gap-5 h-36 justify-between card"
          style={{ background: "#208ce4" }}
        >
          <div
            className="absolute w-20 h-20 rounded-full bg-white text-white opacity-20"
            style={{ bottom: "-30%", right: "-5%" }}
          ></div>

          <div>
            <p className="text-white text-xl">Number of Products</p>
            <p className="text-3xl font-semibold text-white">
              {products.length}
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
            <p className="text-white text-xl">Total Inventory</p>
            <p className="text-3xl font-semibold text-white">{totalStock}</p>
          </div>
          <div>
            <FaWarehouse size={50} className="w-10 rounded-full text-white" />
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
            <p className="text-white text-xl">Total Sales</p>
            <p className="text-3xl font-semibold text-white">{totalSales}</p>
          </div>
          <div>
            <FaDollarSign size={50} className="w-10 rounded-full text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-row md:gap-5 md:mt-10 cards">
        <div className="mt-10 h-96 flex flex-col items-center border rounded-xl p-5 shadow-xl w-1/2 cardgraph">
          <Line data={salesData} options={chartOptions} />
        </div>
        <div className="mt-10 h-96 flex flex-col items-center border rounded-xl p-5 shadow-xl w-1/2 cardgraph">
          <Bar data={salesDataByProduct} options={chartOptions} />
        </div>
      </div>
      {/* <h1 className="text-2xl font-bold mt-10 mb-2">Tasks</h1>
      <div className="table w-full mt-2 border rounded-md p-5 shadow-lg">
        <h1 className="text-2xl font-semibold">Tasks List</h1>
        <table className="w-full border-none mt-2">
          <tr className="text-left">
            <th className="font-semibold text-gray-600 p-4">TASK NAME</th>
            <th className="font-semibold text-gray-600">CREATED BY</th>
            <th className="font-semibold text-gray-600">CREATED ON</th>
            <th className="font-semibold text-gray-600">REMINDER</th>
            <th className="font-semibold text-gray-600 text-center">STATUS</th>
            <th className="w-16 text-center"></th>
          </tr>
          {TaskList.map((task) => (
            <tr className="items-center justify-center bg-gray-50">
              <td className="p-4">{task.taskname}</td>
              <td>{task.createdby}</td>
              <td>{task.createdOn}</td>
              <td>{task.Reminder}</td>
              <td>
                <div
                  className={`${
                    task.Status === "Completed"
                      ? "text-green-900 font-bold text-sm bg-green-300 p-2 rounded-full text-center"
                      : "text-red-900 font-bold text-sm bg-red-300 p-2 rounded-full text-center"
                  }`}
                >
                  {task.Status}
                </div>
              </td>
              <td className="w-24 text-center flex justify-center items-center p-5">
                <BiDotsVerticalRounded />
              </td>
            </tr>
          ))}
        </table>
      </div> */}
      <div className="flex flex-row mt-10 pb-10 cards gap-10 md:gap-5">
        <div className="w-1/2 border border-gray-400 rounded-xl p-2 h-96 overflow-y-auto card no-scrollbar">
          <h1 className="text-xl font-semibold mt-2 text-center">
            Inbound Logs
          </h1>
          {activitiesDates.map((date) => (
            <div className="bg-white p-5 pb-2 flex flex-col justify-center items-center">
              <div className="line h-1 w-full border-t-2 border-gray-300 border-dashed"></div>
              <h1
                className="text-sm font-semibold bg-white w-24 text-center"
                style={{ marginTop: "-15px" }}
              >
                {date}
              </h1>
              {inboundLogs && inboundLogs.length === 0 && (
                <p>No logs available</p>
              )}

              {inboundLogs.map(
                (activity) =>
                  activity.date.split("T")[0] === date && (
                    <div className="flex flex-row w-full">
                      <div className="flex flex-col gap-5 mt-2 text-left w-full">
                        <div className="flex flex-col">
                          <p className=" text-gray-800 text-md text-left w-full">
                            Inbound {activity.quantityChange}{" "}
                            {activity.productName}
                          </p>
                          <p className=" text-gray-500 text-sm text-left">
                            Note: {activity.reason}
                          </p>
                          <p className=" text-gray-400 text-sm text-left">
                            {getWeekDay(activity.date)},{" "}
                            {activity.date.split("T")[0]}
                          </p>
                          <p className=" text-gray-400 text-sm text-left">
                            Time: {activity.date.split("T")[1].split(".")[0]}
                          </p>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
        <div className="w-1/2 border border-gray-400 rounded-xl p-2 h-96 overflow-y-auto card no-scrollbar">
          <h1 className="text-xl font-semibold mt-2 text-center">
            Outbound Logs
          </h1>
          {outboundDates.map((date) => (
            <div className="bg-white p-5 mt-2 flex flex-col justify-center items-center ">
              <div className="line h-1 w-full border-t-2 border-gray-300 border-dashed"></div>
              <h1
                className="text-sm font-semibold bg-white w-24 text-center"
                style={{ marginTop: "-15px" }}
              >
                {date}
              </h1>
              <div className="flex flex-col w-full">
                {outboundLogs.map(
                  (message) =>
                    message.date.split("T")[0] === date && (
                      <div className="flex flex-row gap-5 mt-2 items-center">
                        <div className="flex flex-col w-full">
                          <p className=" text-gray-800 text-md text-left w-full">
                            {message.clientName}
                          </p>
                          <p className=" text-gray-500 text-sm text-left">
                            Note: {message.reason}
                          </p>
                          <p className=" text-gray-400 text-sm text-left">
                            {getWeekDay(message.date)},{" "}
                            {message.date.split("T")[0]}
                          </p>
                          <p className=" text-gray-400 text-sm text-left">
                            Time: {message.date.split("T")[1].split(".")[0]}
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
