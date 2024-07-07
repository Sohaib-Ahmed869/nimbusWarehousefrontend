import React from "react";
import homeService from "../Assets/homeService.png";
import Logo from "../Assets/Logo.png";
import { MdArrowForward } from "react-icons/md";
const Services = () => {
  return (
    <div className="flex flex-row justify-between items-center p-36 pt-0 pb-20">
      <div className="w-1/2 flex-col ">
        <img src={Logo} alt="homeAboutUs" className="h-12 mb-10" />
        <h1 className="text-4xl font-bold text-slate-900">
          Nimbus <span className="text-blue-500">360</span> Warehouse Solutions
          can be used on both mobile and desktop devices
        </h1>
        <p className="text-lg mt-3 text-gray-500">
          With Nimbus360, you can manage your warehouse operations on the go.
          Our software is designed to be responsive and can be used on both
          mobile and desktop devices. We offer a range of features that help you
          keep track of your inventory, manage your warehouse operations, and
          generate reports. Our clients have always had the best experience with
          our services.
        </p>
        <div className="flex flex-row items-center mt-20">
          <button
            className=" text-white px-8 py-3 rounded-0 h-full flex justify-center items-center bg-blue-500 hover:bg-blue-600"
            onClick={() => (window.location.href = "/login")}
          >
            GET STARTED <MdArrowForward className="ml-4" />
          </button>
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <img src={homeService} alt="homeAboutUs" style={{ height: "70vh" }} />
      </div>
    </div>
  );
};

export default Services;
