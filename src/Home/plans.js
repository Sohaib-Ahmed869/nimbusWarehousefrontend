import React from "react";
import { FaCircle } from "react-icons/fa";
const plans = [
  {
    name: "Basic Plan",
    price: "14999/-",
    max_items_add: "10",
    max_items_feature: "10",
  },
  {
    name: "Silver Plan",
    price: "19,999/-",
    max_items_add: "20",
    max_items_feature: "50",
  },
  {
    name: "Gold Plan",
    price: "37,999/-",
    max_items_add: "50",
    max_items_feature: "No limit",
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
          <div className="flex flex-col items-center justify-center p-10 shadow-xl border border-black">
            <h1 className="text-2xl text-gray-500 font-bold">{plan.name}</h1>
            <h1 className="text-4xl text-blue-400 font-bold italic mt-10">
              PKR {plan.price}
            </h1>

            <p className="text-gray-500 mt-5">
              The plan is available on a month-to-month basis with no time
              restrictions.
            </p>
            <div className="mt-5 text-gray-500 w-full">
              <ul>
                <li>
                  <h1 className="flex items-center">
                    Maximum Items to Add: {plan.max_items_add}
                  </h1>
                </li>

                <li>
                  <h1 className="flex items-center">
                    Maximum Clients to Feature: {plan.max_items_feature}
                  </h1>
                </li>
              </ul>
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
