import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Modal } from "react-bootstrap";
const URL = process.env.REACT_APP_BACKEND_URL;

const AddProduct = () => {
  const [name, setProductname] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState(0);
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const addProduct = async () => {
    if (!name || !unit || !stock) {
      alert("Please fill all the fields!");
      return;
    }

    try {
      const response = await axios.post(`${URL}/products/add`, {
        name,
        unit,
        stock,
      });
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
      const response = await axios.get(`${URL}/products`);
      setProducts(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <div className="flex flex-col w-full min-h-screen p-5">
      <div className="flex flex-col justify-center p-5 border shadow-md rounded-xl">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Products</p>
          <button
            className="text-blue-500 p-3 ml-5 flex items-center justify-center hover:text-blue-700"
            style={{ border: "none" }}
            onClick={() => setShowAddProductModal(true)}
          >
            <BiPlus className="w-6 border rounded-full border-gray-300 h-6 text-blue-500 me-2" />
            <p>Add Product</p>
          </button>
        </div>
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center p-5">
            <BiPlus className="w-6 border rounded-full border-gray-300 mt-1 h-6 text-blue-500 me-2" />
            <p className="text-2xl font-bold">Add Product</p>
          </div>
          <div className="flex flex-col w-full p-10">
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
            <p className="text-sm text-gray-500 mt-5">Unit</p>
            <div className="w-full flex  items-center border-2 border-gray-300 rounded-full p-3 mt-2">
              <input
                type="text"
                className="w-full"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProduct;
