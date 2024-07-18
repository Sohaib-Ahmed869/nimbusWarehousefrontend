import React from "react";
import homeWorks from "../Assets/homeWorks.png";
import aboutusicon from "../Assets/aboutusicon.png";
import homeServiceTick from "../Assets/homeServiceTick.png";

const points = [
  "Keep track of inbound shipments and outbound orders",
  "Manage your inventory efficiently",
  "Track your warehouse performance",
  "Get real-time updates on your warehouse operations",
  "Generate receipts and invoices",
];

const HowItWorks = () => {
  return (
    <div className="flex flex-col w-full p-0 md:flex-row justify-center items-center md:p-36 md:pt-10 md:pb-20">
      <div className="w-2/3 md:w-1/2">
        <img src={homeWorks} alt="homeAboutUs" style={{ height: "auto" }} />
      </div>
      <div className="md:w-1/2 flex-col mx-10">
        <p className="text-lg font-semibold text-gray-500 mb-3">
          We offer the best services for your warehousing needs
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900">
          10+ Deployed Softwares <br></br>Nimbus
          <span className="text-blue-500">360</span> Warehouse Solutions
        </h1>
        <div className="flex flex-row items-center mt-3 md:mt-10 mb-10">
          <img src={aboutusicon} alt="aboutusicon" style={{ height: "auto" }} />
        </div>
        <p className="text-lg font-semibold text-gray-500">
          Keep your warehouse operations running smoothly with Nimbus360. We
          offer what you need to manage your warehouse efficiently. Our clients
          have always had the best experience with our services.
        </p>
        <div className="flex flex-col justify-center items-center md:mt-10 px-4 md:px-0">
          {points.map((point) => (
            <div className="flex w-full flex-row items-center md:items-start mt-4 gap-5">
              <img
                src={homeServiceTick}
                alt="homeServiceTick"
                className="w-8 h-8 md:w-auto md:h-auto"
              />
              <p className="text-md md:text-lg md:text-xl text-slate-900 ml-0 md:ml-3 mt-2 md:mt-0">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
