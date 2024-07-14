import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

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
  const [selectedProductsRate, setSelectedProductsRate] = useState([]);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);

  const [reason, setReason] = useState("");

  const [showAddProductToOutbound, setShowAddProductToOutbound] =
    useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}/products`, {
        withCredentials: true,
      });
      setAllProducts(response.data);
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  const onClientChange = (e) => {
    console.log("Client: ", e.target.value);
    setSelectedClient(e.target.value);
  };

  useEffect(() => {
    if (selectedClient == "null" || selectedClient == null) {
      setProducts([]);
      return;
    }
    if (selectedClient) {
      const clientselected = clients.find(
        (client) => client._id === selectedClient
      );
      const product_rates = clientselected.product_rates;
      setProducts(product_rates);
    }
  }, [selectedClient]);

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
    getClients();
    getProducts();
  }, [products, selectedClient]);

  useEffect(() => {
    console.log(selectedProductsId);
    console.log(selectedProducts);
  }, [selectedProductsId, selectedProducts]);

  const onAddProductToOutbound = (product, fromPopup) => {
    console.log(product);
    console.log(selectedProductQuantity);
    console.log(fromPopup);

    // return if any null
    if (fromPopup && (!product || !selectedProductQuantity)) {
      console.log("inside if");
      alert("Please select product and quantity");
      return;
    }

    //if the stock is less than the quantity, then return
    if (
      getProductQuantity(product) <
      quantityChanges[selectedProductsId.indexOf(product)] + 1
    ) {
      alert("Not enough stock");
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
    const product_name = getProductName(product);
    setSelectedProducts([...selectedProducts, product_name]);
    setQuantityChanges([...quantityChanges, 1]);
    const product_rate = getProductRate(product);
    setSelectedProductsRate([...selectedProductsRate, product_rate]);
  };

  const onRemoveProductFromOutbound = (index) => {
    setSelectedProductsId(selectedProductsId.filter((_, i) => i !== index));
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    setQuantityChanges(quantityChanges.filter((_, i) => i !== index));
    setSelectedProductsRate(selectedProductsRate.filter((_, i) => i !== index));
  };

  const onQuantityChange = (index, value) => {
    const newQuantityChanges = [...quantityChanges];
    newQuantityChanges[index] = value;
    setQuantityChanges(newQuantityChanges);
    console.log(newQuantityChanges);
  };

  const getClientName = (clientId) => {
    const client = clients.find((client) => client._id === clientId);
    return client ? client.name : "";
  };

  const onSubmitOutbound = async () => {
    const clientName = getClientName(selectedClient);

    if (!clientName || !selectedProductsId.length || !reason) {
      alert("Please fill all the fields");
      return;
    }

    // alert confirmation
    if (
      !window.confirm(
        `Are you sure you want to submit the outbound for ${clientName}?`
      )
    ) {
      return;
    }

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
              acc +
              getProductRate(selectedProductsId[index]) *
                quantityChanges[index],
            0
          ),
        },
        { withCredentials: true }
      );
      alert("Outbound successful");

      printReceipt2(
        getClientName(selectedClient),
        selectedProducts,
        selectedProductsRate,
        selectedProducts.reduce(
          (acc, product, index) =>
            acc +
            getProductRate(selectedProductsId[index]) * quantityChanges[index],
          0
        ),
        quantityChanges
      );

      //clear the form
      setSelectedProductsId([]);
      setSelectedProducts([]);
      setQuantityChanges([]);
      setSelectedProductsRate([]);
      setReason("");
      getProducts();
    } catch (error) {
      alert("Error: " + error.response);
    }
  };

  const getProductName = (productId) => {
    const product = allProducts.find((product) => product._id === productId);
    return product ? product.name : "";
  };

  const getProductQuantity = (productId) => {
    const product = allProducts.find((product) => product._id === productId);
    return product ? product.stock : 0;
  };

  const getProductRate = (productId) => {
    const product = products.find((product) => product.productId === productId);
    console.log("Returned rate", product.rate);
    return product ? product.rate : 0;
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
    console.log("Printing receipt");

    // Constructing receipt content
    let receiptContent = "";
    receiptContent +=
      "<div style='text-align:center; margin:auto; width: 100%; padding: 0px;'>";
    receiptContent +=
      "<div style='margin-bottom: 10px;'><img src='Logo.png' alt='Logo' style='width:100px;'></div>"; // Replace 'logo.png' with the path to your logo
    receiptContent +=
      "<div><strong>------------------------------ Receipt ------------------------------</strong></div>";
    receiptContent +=
      "<div style=' margin-top:30px, font-weight:bold'>I-11 Mandi Mor</div>";
    receiptContent +=
      "<div style=' margin-top:10px, font-weight:bold'>051 2719280</div>";
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
        selectedProductsRate[cartItems.indexOf(item)] +
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

    console.log("Receipt printed");
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-5">
      <div className="flex flex-col justify-center p-5 border shadow-md rounded-xl">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Outbound</p>
          <button
            className=" text-blue-500 p-3 ml-5 flex items-center justify-center hover:text-blue-700"
            style={{ border: "none" }}
            onClick={() => setShowAddProductToOutbound(true)}
          >
            Add Product
          </button>
        </div>

        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Client</p>
          <select
            className="border p-2 rounded-md w-96"
            onChange={onClientChange}
          >
            <option value={null}>Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="table w-full p-5">
          {products.length != 0 ? (
            <div className="table-row-group">
              <div
                className="table-row text-white"
                style={{ backgroundColor: "#198e7d" }}
              >
                <div className="table-cell border p-2">Product Name</div>
                <div className="table-cell border p-2">In Stock</div>
                <div className="table-cell border p-2">Price for client</div>
                <div className="table-cell border p-2">Action</div>
              </div>
              {products.map((product, index) => (
                <div
                  className="table-row hover:cursor-pointer hover:bg-gray-100"
                  key={product._id}
                >
                  <div className="table-cell p-2 border border-r-0">
                    {getProductName(product.productId)}
                  </div>
                  <div className="table-cell p-2 border border-l-0 border-r-0">
                    {getProductQuantity(product.productId)}
                  </div>
                  <div className="table-cell p-2 border border-l-0 border-r-0">
                    {product.rate}
                  </div>
                  <div className="table-cell p-2 border border-l-0">
                    <button
                      className="text-green-500"
                      onClick={() =>
                        onAddProductToOutbound(product.productId, false)
                      }
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
                  key={product._id}
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
                    {getProductRate(selectedProductsId[index]) *
                      quantityChanges[index]}
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
          <p className="text-2xl font-bold">
            {selectedProducts.reduce(
              (acc, product, index) =>
                acc +
                getProductRate(selectedProductsId[index]) *
                  quantityChanges[index],
              0
            )}
          </p>
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
                getClientName(selectedClient),
                selectedProducts,
                selectedProductsRate,
                selectedProducts.reduce(
                  (acc, product, index) =>
                    acc +
                    getProductRate(selectedProductsId[index]) *
                      quantityChanges[index],
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
        <Modal.Header closeButton>
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
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {getProductName(product.productId)}
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
