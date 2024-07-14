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
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen p-5">
      <div className="flex flex-col justify-center p-5 border shadow-md rounded-xl">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Products</p>
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
    </div>
  );
};

export default AddProduct;
