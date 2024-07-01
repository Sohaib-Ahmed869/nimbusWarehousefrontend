import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
const URL = process.env.REACT_APP_BACKEND_URL;

const AddProductRate = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientProductRates, setClientProductRates] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [newSelectedProduct, setNewSelectedProduct] = useState("");
  const [rate, setRate] = useState(0);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [updateClientProductRate, setUpdateClientProductRate] = useState(false);
  const [updatedProductRate, setUpdatedProductRate] = useState(0);

  useEffect(() => {
    axios.get(`${URL}/clients`).then((response) => {
      setClients(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${URL}/products`).then((response) => {
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
        `${URL}/clients/product_rates/${selectedClient}`
      );
      setClientProductRates(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  //add the product rate of the client
  const addProductRate = async () => {
    if (!selectedClient || !selectedProduct || !rate) {
      alert("Please fill all the fields!");
      return;
    }
    try {
      const response = await axios.post(
        `${URL}/clients/product_rates/${selectedClient}`,
        {
          productId: selectedProduct,
          rate,
        }
      );
      setSelectedClient("");
      setSelectedProduct("");
      setRate(0);
      alert("Product rate added successfully!");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const updateProductRate = async () => {
    if (!selectedClient|| !updateProductRate) {
      alert("Please fill all the fields!");
      return;
    }
    try {
      const response = await axios.put(
        `${URL}/clients/product_rates/update/${selectedClient}`,
        {
          productId: newSelectedProduct,
          rate: updatedProductRate,
        }
      );
      setSelectedClient("");
      setSelectedProduct("");
      setRate(0);
      alert("Product rate updated successfully!");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    if (selectedClient) getClientProductRates();
  }, [selectedClient]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex w-full justify-between p-5">
        <div className="flex items-center justify-center p-5">
          <BiPlus className="w-6 border rounded-full border-gray-300 mt-1 h-6 text-blue-500 me-2" />
          <p className="text-2xl font-bold">Add Product Rate</p>
        </div>
        <button
          className="bg-blue-500 text-white p-3 rounded-md mt-2"
          onClick={() => {
            if (!selectedClient) {
              alert("Please select a client to add product rate");
              return;
            }

            setShowAddClientModal(true);
          }}
        >
          Add Product Rate
        </button>
      </div>
      <div className="flex flex-col w-full p-20">
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
                      <div className="flex justify-between w-full">
                        {clientProductRate.rate}

                        <BiEdit
                          className="w-4 h-4 text-blue-500 cursor-pointer"
                          onClick={() => {
                            setNewSelectedProduct(clientProductRate.productId);
                            setUpdateClientProductRate(true);
                            setUpdatedProductRate(clientProductRate.rate);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        show={updateClientProductRate}
        onHide={() => setUpdateClientProductRate(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-2xl font-bold">Update Product Rate</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-500 mt-5">Rate</p>
          <input
            type="number"
            className="w-full border-2 border-gray-300 rounded-full p-3 mt-2"
            value={updatedProductRate}
            onChange={(e) => setUpdatedProductRate(e.target.value)}
          />
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full"
              onClick={updateProductRate}
            >
              Update Product Rate
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-md mt-2 w-full"
              onClick={() => setUpdateClientProductRate(false)}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {updateClientProductRate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <Modal
        show={showAddClientModal}
        onHide={() => setShowAddClientModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-2xl font-bold">Add Product Rate</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-gray-500 mt-5">Product</p>
          <select
            className="w-full border-2 border-gray-300 rounded-full p-3 mt-2"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-5">Rate</p>
          <input
            type="number"
            className="w-full border-2 border-gray-300 rounded-full p-3 mt-2"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full"
              onClick={addProductRate}
            >
              Add Product Rate
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-md mt-2 w-full"
              onClick={() => setShowAddClientModal(false)}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProductRate;
