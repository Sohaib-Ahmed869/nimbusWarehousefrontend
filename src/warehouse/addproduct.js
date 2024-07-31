import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import "./dashboard.css";
const URL = process.env.REACT_APP_BACKEND_URL;

const AddProduct = () => {
  const [name, setProductname] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState(0);
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const addProduct = async () => {
    if (!name || !unit || !stock) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/products/add`,
        {
          name,
          unit,
          stock,
        },
        {
          withCredentials: true,
        }
      );
      setProductname("");
      setUnit("");
      setStock(0);

      alert("Product added successfully!");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`, {
        withCredentials: true,
      });

      setProducts(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [window.innerWidth]);

  return (
    <div className="flex flex-col p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      <div className="flex items-center justify-between">
        {/* <FiCornerRightDown className="w-6 rounded-full border-gray-300 mt-1 h-6 text-blue-500 me-2" /> */}
        <p className="text-3xl font-semibold">Products</p>
        <button
          className="text-blue-500 ml-5 flex items-center justify-center hover:text-blue-700"
          style={{ border: "none" }}
          onClick={() => setShowAddProductModal(true)}
        >
          <BiPlus className="w-5 h-5" />
          <p>Add Product</p>
        </button>
      </div>
      <div className="flex flex-col justify-center p-5 mt-5 border shadow-md rounded-xl">
        <div className="table w-full p-5">
          <table className="w-full">
            <thead>
              <tr
                className="table-row text-white text-left"
                style={{ backgroundColor: "#198e7d" }}
              >
                <th className="p-2">Product Name</th>
                <th>Unit</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className="table-row hover:cursor-pointer hover:bg-gray-100"
                  key={product._id}
                >
                  <td className="p-2">{product.name}</td>
                  <td>{product.unit}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <Modal
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 w-1/2 rounded-2xl shadow-xl z-50 p-5 bg-white modal"
        style={{ width: mobileView ? "90%" : "33%" }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body className="modalbody flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              {/* <BiPlus className="w-6 border rounded-full border-gray-300 mt-1 h-6 text-blue-500 me-2" /> */}
              <p className="text-2xl text-center md:text-left font-bold">Add Product</p>
            </div>
            <div>
              <div className="flex items-center justify-between mt-5">
                <div>
                  <p className="text-sm text-gray-500">Product Name</p>
                  <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
                    <input
                      type="text"
                      className="w-full"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setProductname(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unit</p>
                  <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
                    <input
                      type="text"
                      className="w-full"
                      placeholder="Unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mt-5">Stock</p>
                <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
                  <input
                    type="number"
                    className="w-full"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full py-4 bg-blue-500 text-white rounded-full p-2 mt-10 hover:bg-blue-600"
                onClick={addProduct}
              >
                Add Product
              </button>
              <button
                className="w-full py-4 bg-red-500 text-white rounded-full p-2 mt-5 hover:bg-red-600"
                onClick={() => setShowAddProductModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProduct;
