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
    <div className="flex flex-row justify-center items-center p-36 pt-10 pb-20">
      <div className="w-1/2">
        <img src={homeWorks} alt="homeAboutUs" style={{ height: "auto" }} />
      </div>
      <div className="w-1/2 flex-col ml-10">
        <p className="text-lg font-semibold text-gray-500 mb-3">
          We offer the best services for your warehousing needs
        </p>
        <h1 className="text-4xl font-bold text-slate-900">
          10+ Deployed Softwares <br></br>Nimbus
          <span className="text-blue-500">360</span> Warehouse Solutions
        </h1>
        <div className="flex flex-row items-center mt-10 mb-10">
          <img src={aboutusicon} alt="aboutusicon" style={{ height: "auto" }} />
        </div>
        <p className="text-lg font-semibold text-gray-500">
          Keep your warehouse operations running smoothly with Nimbus360. We
          offer what you need to manage your warehouse efficiently. Our clients
          have always had the best experience with our services.
        </p>
        <div className="flex flex-col justify-center items-center mt-10">
          {points.map((point) => (
            <div className="flex-row w-full flex mt-4">
              <img
                src={homeServiceTick}
                alt="homeServiceTick"
                style={{ height: "auto" }}
              />
              <p className="text-xl text-slate-900 ml-3">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
