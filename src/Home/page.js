import { React } from "react";
import Navbar from "./navbar";
import Membership from "./plans";
import HowItWorks from "./services";
import Services from "./mobile";
import { Link } from "react-router-dom";

import homeMockup from "../Assets/homeMockup.png";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className="flex justify-between items-center bg-gray-50 p-36"
        style={{ height: "60vh" }}
      >
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">
            Solution to your<br></br>{" "}
            <span className="text-blue-500">Warehousing Needs</span>
          </h1>
          <p className="text-xl mt-10">
            Nimbus360 Warehouse Solutions is a cloud-based warehouse management
            system that helps you manage your warehouse operations efficiently.
          </p>
          <div className="flex gap-5 mt-10">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-black font-bold px-5 py-2 border border-black hover:bg-gray-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <img src={homeMockup} alt="Home Mockup" className="w-1/3" />
      </div>
      <HowItWorks />
      <Services />
      <Membership />
    </div>
  );
};

export default Home;
