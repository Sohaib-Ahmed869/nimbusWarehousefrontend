import React from "react";
import { FaCircle } from "react-icons/fa";
const plans = [
  {
    name: "Warehouse Management",
    price: "$46.99",
    with_pos: "No",
    with_warehouse: "Yes",
  },
  {
    name: "Point of Sale System",
    price: "$46.99",
    with_pos: "Yes",
    with_warehouse: "No",
  },
  {
    name: "Premium Plan",
    price: "$79.99",
    with_pos: "Yes",
    with_warehouse: "Yes",
  },
];
const Membership = () => {
  return (
    <div className="justify-center items-center flex flex-col ml-10 pt-0 p-20">
      <h1 className="text-sm font-bold italic" style={{ letterSpacing: "7px" }}>
        PRICING TABLES
      </h1>
      <h1 className="text-3xl mt-2 italic font-semibold text-gray-600">
        MEMBERSHIP PLANS
      </h1>
      <div className="flex flex-row justify-between mt-10 gap-5 text-center ">
        {plans.map((plan) => (
          <div
            className={`flex flex-col items-center justify-center p-10 border hover:bg-gray-50 border-black hover:shadow-xl cursor-pointer ${
              plan.name === "Premium Plan" ? "premium" : ""
            }`}
            key={plan.name}
          >
            <h1 className="text-2xl text-gray-500 font-bold">{plan.name}</h1>
            <h1 className="text-4xl text-blue-400 font-bold italic mt-10">
              {plan.price}
            </h1>

            <p className="text-gray-500 mt-5">
              The plan is available on a month-to-month basis with no time
              restrictions.
            </p>
            <div className="mt-5 text-gray-500 text-center w-full">
              <h1 className="flex items-center justify-center">
                With Warehouse Management:{" "}
                <span
                  className={`font-bold ml-1 ${
                    plan.with_warehouse==="Yes" ? "text-green-500" : "text-red-600"
                  }`}
                >
                  {plan.with_warehouse}
                </span>
              </h1>

              <h1 className="flex items-center justify-center">
                With POS Integration:{" "}
                <span
                  className={`font-bold ml-1 ${
                    plan.with_pos==="Yes" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {plan.with_pos}
                </span>
              </h1>

              <button className="text-md text-white bg-blue-500 py-3 mt-4 w-full">
                SUBSCRIBE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
