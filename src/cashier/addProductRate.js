import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Modal } from "react-bootstrap";
const URL = process.env.REACT_APP_BACKEND_URL;

const AddProductRate = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientProductRates, setClientProductRates] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    axios
      .get(`${URL}/clients`, {
        withCredentials: true,
      })
      .then((response) => {
        setClients(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/products`, {
        withCredentials: true,
      })
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.name : "";
  };

  //get the product_rates of the each client
  const getClientProductRates = async () => {
    if (!selectedClient) {
      alert("Please select a client!");
      return;
    }
    try {
      const response = await axios.get(
        `${URL}/clients/product_rates/${selectedClient}`,
        {
          withCredentials: true,
        }
      );
      setClientProductRates(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    if (selectedClient) getClientProductRates();
  }, [selectedClient]);

  return (
    <div className="flex flex-col p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      <div className="flex w-full justify-between">
        <div className="flex justify-between w-full">
          <p className="text-3xl font-semibold">Product Rates</p>
          <p className="text-sm text-gray-500 ml-5">
            To add or update a product rate, contact the administrator
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-10 mt-5 border shadow-md rounded-xl">
        <p className="text-sm text-gray-500">Client</p>
        <select
          className="w-full border-2 border-gray-300 rounded-full p-3 mt-2"
          value={selectedClient}
          onChange={(e) => {
            setSelectedClient(e.target.value);
          }}
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <div className="flex flex-col w-full mt-5">
          <p className="text-sm text-gray-500">Product Rates</p>
          {!selectedClient ? (
            <p className="text-sm text-gray-500 mt-5">
              Please select a client to view product rates
            </p>
          ) : clientProductRates.length === 0 ? (
            <p className="text-sm text-gray-500 mt-5">
              No product rates found for the selected client
            </p>
          ) : (
            <div className="table w-full mt-5">
              <div className="table-row-group">
                <div
                  className="table-row text-white"
                  style={{ backgroundColor: "#198e7d" }}
                >
                  <div className="table-cell border p-2">Product Name</div>
                  <div className="table-cell border p-2">Rate</div>
                </div>
                {clientProductRates.map((clientProductRate) => (
                  <div
                    className="table-row hover:cursor-pointer hover:bg-gray-100"
                    key={clientProductRate._id}
                  >
                    <div className="table-cell p-2 border border-r-0">
                      {getProductName(clientProductRate.productId)}
                    </div>
                    <div className="table-cell p-2 border border-l-0 border-r">
                      {clientProductRate.rate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductRate;
