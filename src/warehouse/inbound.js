import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiCornerRightDown } from "react-icons/fi";
const URL = process.env.REACT_APP_BACKEND_URL;

const Inbound = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inboundQuantity, setInboundQuantity] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/products`, {
        withCredentials: true,
      })
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  const addInbound = async () => {
    if (!selectedProduct || !quantity) {
      alert("Please fill all the fields!");
      return;
    }
    try {
      const response = await axios.put(
        `${URL}/products/inbound/${selectedProduct}`,
        {
          quantity,
          reason,
        },
        {
          withCredentials: true,
        }
      );
      setSelectedProduct("");
      setQuantity(0);
      alert("Inbound added successfully!");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex items-center justify-center p-5">
        <FiCornerRightDown className="w-6 rounded-full border-gray-300 mt-1 h-6 text-blue-500 me-2" />
        <p className="text-2xl font-bold">Add Inbound</p>
      </div>
      <div className="flex flex-col w-full p-20">
        <p className="text-sm text-gray-500">Product</p>
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
        <p className="text-sm text-gray-500 mt-5">Quantity</p>
        <input
          type="number"
          className="w-full border-2 border-gray-300 rounded-full p-3 mt-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-5">Reason</p>
        <textarea
          className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white rounded-full p-3 mt-5"
          onClick={addInbound}
        >
          Add Inbound
        </button>
      </div>
    </div>
  );
};

export default Inbound;
