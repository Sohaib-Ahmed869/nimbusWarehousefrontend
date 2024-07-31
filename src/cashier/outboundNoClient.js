import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";

const URL = process.env.REACT_APP_BACKEND_URL;

const Outbound = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductsId, setSelectedProductsId] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantityChanges, setQuantityChanges] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [productRates, setProductRates] = useState([]);

  const [reason, setReason] = useState("");

  const [showAddProductToOutbound, setShowAddProductToOutbound] =
    useState(false);

  const [totalPrice, setTotalPrice] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`, {
        withCredentials: true,
      });
      console.log("All Products:", response.data);
      setAllProducts(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

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
    console.log(reason); // This will log the updated state
  }, [reason]);

  useEffect(() => {
    // calculate total price
    const total = selectedProducts.reduce(
      (acc, product, index) =>
        acc + productRates[index] * quantityChanges[index],
      0
    );
    setTotalPrice(total);
  }, [productRates, quantityChanges]);

  useEffect(() => {
    getClients();
    getProducts();
  }, [products, selectedClient]);

  useEffect(() => {
    console.log(selectedProductsId);
    console.log(selectedProducts);
  }, [selectedProductsId, selectedProducts]);

  const onAddProductToOutbound = (product, fromPopup) => {
    console.log(product, fromPopup);
    if (fromPopup) {
      product = getProduct(product);
      console.log("New prod:", product);
    }

    // return if any null
    if (fromPopup && (!product || !selectedProductQuantity)) {
      console.log("inside if");
      alert("Please select product and quantity");
      return;
    }
    //if product already exists in the selected products, then just increase the quantity
    if (selectedProductsId.includes(product)) {
      const index = selectedProductsId.indexOf(product);
      const newQuantityChanges = [...quantityChanges];
      newQuantityChanges[index] += 1;
      setQuantityChanges(newQuantityChanges);

      return;
    }
    console.log(product);
    setSelectedProductsId([...selectedProductsId, product]);
    const product_name = product.name;
    setSelectedProducts([...selectedProducts, product_name]);
    setQuantityChanges([...quantityChanges, 1]);
  };

  const onRemoveProductFromOutbound = (index) => {
    setSelectedProductsId(selectedProductsId.filter((_, i) => i !== index));
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    setQuantityChanges(quantityChanges.filter((_, i) => i !== index));
    setProductRates(productRates.filter((_, i) => i !== index));
  };

  const onQuantityChange = (index, value) => {
    const newQuantityChanges = [...quantityChanges];
    newQuantityChanges[index] = value;
    setQuantityChanges(newQuantityChanges);
    console.log(newQuantityChanges);
  };

  const getProduct = (id) => {
    return allProducts.find((product) => product._id === id);
  };

  const onSubmitOutbound = async () => {
    if (
      !selectedClient ||
      selectedProducts.length === 0 ||
      !totalPrice ||
      !reason
    ) {
      alert("Please fill all the fields");
      return;
    }

    const clientName = selectedClient;

    try {
      await axios.put(
        `${URL}/products/outbound`,
        {
          productNames: selectedProducts,
          products: selectedProductsId,
          quantityChange: quantityChanges,
          reason,
          clientName: clientName,
          total: selectedProducts.reduce(
            (acc, product, index) =>
              acc + productRates[index] * quantityChanges[index],
            0
          ),
        },
        {
          withCredentials: true,
        }
      );
      alert("Outbound successful");

      printReceipt2(
        selectedClient,
        selectedProducts,
        productRates,
        selectedProducts.reduce(
          (acc, product, index) =>
            acc + productRates[index] * quantityChanges[index],
          0
        ),
        quantityChanges
      );

      console.log("Clearing form");
      // clear the form
      setSelectedProductsId([]);
      setSelectedProducts([]);
      setQuantityChanges([]);
      setProductRates([]);
      setReason("");
      setSelectedClient("");
      console.log(reason);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  useEffect(() => {
    console.log("Selected Products", selectedProducts);
  }, [selectedProducts]);

  const printReceipt2 = (
    customerName,
    cartItems,
    selectedProductsRate,
    GrandTotal,
    quantityChanges
  ) => {
    // Constructing receipt content
    let receiptContent = "";
    receiptContent +=
      "<div style='text-align:center; margin:auto; width: 100%; padding: 0px;'>";
    receiptContent +=
      "<div style='margin-bottom: 10px;'><img src='Logo.png' alt='Logo' style='width:100px;'></div>"; // Replace 'logo.png' with the path to your logo
    receiptContent +=
      "<div><strong>------------------------------ Receipt ------------------------------</strong></div>";
    receiptContent +=
      "<div style=' margin-top:30px, font-weight:bold'>Shop#01, Ground Floor, Phantom Mall, I-8 Markaz, Islamabad</div>";
    receiptContent +=
      "<div style=' margin-top:10px, font-weight:bold'>051 2719280</div>";
    receiptContent +=
      "<div style=' margin-top:10px, font-weight:bold'>NTN Number: C251459-8</div>";
    receiptContent +=
      "<div style=' margin-top:30px'>Customer: " + customerName + "</div>";
    receiptContent +=
      "<div style=' margin-top:30px'>Date: " +
      new Date().toLocaleString() +
      "</div>";
    receiptContent +=
      "<div style='border:2px black solid; width:100%; align-self:center;  margin-top:30px'></div>";
    receiptContent +=
      "<div style=' margin-top:30px'><strong>------------------------------ Items ------------------------------</strong></div>";

    // Table for displaying items
    receiptContent += "<table style='width: 100%; border-collapse: collapse;'>";
    receiptContent +=
      "<thead><tr><th style='border: 1px solid #000; padding: 8px;'>Item</th><th style='border: 1px solid #000; padding: 8px;'>Quantity</th><th style='border: 1px solid #000; padding: 8px;'>Price</th></tr></thead>";
    receiptContent += "<tbody>";
    cartItems.forEach((item) => {
      receiptContent += "<tr>";
      receiptContent +=
        "<td style='border: 1px solid #000; padding: 8px;'>" + item + "</td>";
      receiptContent +=
        "<td style='border: 1px solid #000; padding: 8px;'>" +
        quantityChanges[cartItems.indexOf(item)] +
        "</td>";
      receiptContent +=
        "<td style='border: 1px solid #000; padding: 8px;'>PKR" +
        productRates[cartItems.indexOf(item)] +
        "</td>";
      receiptContent += "</tr>";
    });
    receiptContent += "</tbody></table>";

    receiptContent += "<div style='width: 100%;text-align:center;'>";
    receiptContent +=
      "<div style='border:2px black solid; width:100%; align-self:center;margin-top:10px;'></div>";
    receiptContent +=
      "<div style='margin-top:10px'><strong>Total: PKR" +
      GrandTotal +
      "</strong></div>";

    receiptContent +=
      "<div style='border:2px black solid; width:100%; align-self:center;margin-top:10px;'></div>";

    receiptContent +=
      "<div style='border:2px black solid; width:100%; align-self:center;margin-top:10px;'></div>";
    receiptContent +=
      "<div style='margin-top:10px; margin-bottom:20px'><strong>Thank you for your purchase!</strong></div>";
    receiptContent += "</div>";
    receiptContent += "</div>";

    // Opening a new window to display the receipt content
    const printWindow = window.open("", "_blank");

    // Writing the receipt content to the new window
    printWindow.document.write(
      "<div style='font-family: Arial, sans-serif;'>" +
        receiptContent +
        "</div>"
    );

    // Closing the document for printing
    printWindow.document.close();

    // Triggering printing
    printWindow.print();
  };

  const onProductRateChange = (index, value) => {
    const newProductRates = [...productRates];
    newProductRates[index] = value;
    setProductRates(newProductRates);
  };

  return (
    <div className="flex flex-col p-20 pt-10 bg-white h-screen w-full overflow-y-auto dashboard md:no-scrollbar">
      <div className="flex items-center justify-between">
        {/* <FiCornerRightDown className="w-6 rounded-full border-gray-300 mt-1 h-6 text-blue-500 me-2" /> */}
        <p className="text-3xl font-semibold">Outbound Product</p>
        {/* <button
          className=" text-blue-500 mx-5 flex items-center justify-center hover:text-blue-700"
          style={{ border: "none" }}
          onClick={() => setShowAddProductToOutbound(true)}
        >
          <BiPlus className="w-5 h-5" />
          Add Product
        </button> */}
      </div>
      <div className="flex flex-col justify-center p-5 mt-5 border shadow-md rounded-xl">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Client</p>
          <input
            type="text"
            placeholder="Client Name"
            className="border p-2 rounded-md"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          />
        </div>

        <div className="table w-full p-5">
          {allProducts.length != 0 ? (
            <div className="table-row-group">
              <div
                className="table-row text-white"
                style={{ backgroundColor: "#198e7d" }}
              >
                <div className="table-cell border p-2">Product Name</div>
                <div className="table-cell border p-2">In Stock</div>
                <div className="table-cell border p-2">Action</div>
              </div>
              {allProducts.map((product, index) => (
                <div
                  className="table-row hover:cursor-pointer hover:bg-gray-100"
                  key={product._id}
                >
                  <div className="table-cell p-2 border border-r-0">
                    {product.name}
                  </div>
                  <div className="table-cell p-2 border border-l-0 border-r-0">
                    {product.stock}
                  </div>

                  <div className="table-cell p-2 border border-l-0">
                    <button
                      className="text-green-500"
                      onClick={() => onAddProductToOutbound(product, false)}
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products added</p>
          )}
        </div>

        <div className="table w-full p-5">
          {selectedProductsId.length != 0 ? (
            <div className="table-row-group">
              <div
                className="table-row text-white"
                style={{ backgroundColor: "#198e7d" }}
              >
                <div className="table-cell border p-2">Product Name</div>
                <div className="table-cell border p-2">Quantity</div>
                <div className="table-cell border p-2">Price</div>
                <div className="table-cell border p-2">Action</div>
              </div>
              {selectedProducts.map((product, index) => (
                <div
                  className="table-row hover:cursor-pointer hover:bg-gray-100"
                  key={selectedProductsId[index]}
                >
                  <div className="table-cell p-2 border border-r-0">
                    {product}
                  </div>
                  <div className="table-cell p-2 border border-l-0 border-r-0">
                    <input
                      type="number"
                      value={quantityChanges[index]}
                      onChange={(e) => onQuantityChange(index, e.target.value)}
                    />
                  </div>
                  <div className="table-cell p-2 border border-l-0 border-r-0">
                    <input
                      type="number"
                      value={productRates[index]}
                      onChange={(e) =>
                        onProductRateChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div className="table-cell p-2 border border-l-0">
                    <button
                      className="text-red-500"
                      onClick={() => onRemoveProductFromOutbound(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products added</p>
          )}
        </div>
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Total Price</p>
          <p className="text-2xl font-bold">{totalPrice}</p>
        </div>

        <div className="items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Reason</p>
          <textarea
            className="border p-2 rounded-md w-full"
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>

        {/* <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white p-3 rounded-md mt-2 w-full hover:bg-blue-700"
            onClick={() =>
              printReceipt2(
                selectedClient,
                selectedProducts,
                productRates,
                selectedProducts.reduce(
                  (acc, product, index) =>
                    acc + productRates[index] * quantityChanges[index],
                  0
                ),
                quantityChanges
              )
            }
          >
            Print Receipt
          </button>
        </div> */}

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 text-white p-3 rounded-md mt-2 w-full hover:bg-blue-700"
            onClick={onSubmitOutbound}
          >
            Submit
          </button>
        </div>
      </div>

      <Modal
        show={showAddProductToOutbound}
        onHide={() => setShowAddProductToOutbound(false)}
        centered
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-2xl w-1/3 shadow-xl z-50 bg-white p-10"
      >
        <Modal.Header >
          <Modal.Title>
            <p className="text-2xl font-bold">Add Product</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <select
              className="border p-2 rounded-md"
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value={null}>Select Product</option>
              {allProducts.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 rounded-md mt-2 w-full"
              onChange={(e) => setSelectedProductQuantity(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-2 w-full hover:bg-blue-700"
              onClick={() => onAddProductToOutbound(selectedProduct, true)}
            >
              Add
            </button>

            <button
              className="bg-gray-500 text-white p-2 rounded-md mt-2 w-full hover:bg-gray-600"
              onClick={() => setShowAddProductToOutbound(false)}
            >
              Close
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Outbound;
