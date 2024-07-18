import { React, useState } from "react";
import Navbar from "./navbar";
import Membership from "./plans";
import HowItWorks from "./services";
import Services from "./mobile";
import Footer from "../Components/footer";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { BsLinkedin, BsWhatsapp } from "react-icons/bs";

import homeMockup from "../Assets/homeMockup.png";

const Home = () => {
  const [showContactUsModal, setShowContactUsModal] = useState(false);
  return (
    <div>
      <Navbar />
      <div
        className="w-full flex flex-col md:flex-row justify-between items-center bg-gray-50 p-10 pb-0 md:p-36"
        style={{ height: "auto" }}
      >
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold">
            Solution to your<br></br>{" "}
            <span className="text-blue-500">Warehousing Needs</span>
          </h1>
          <p className="text-lg md:text-xl mt-5 md:mt-10">
            Nimbus360 Warehouse Solutions is a cloud-based warehouse management
            system that helps you manage your warehouse operations efficiently.
          </p>
          <div className="flex flex-col md:flex-row gap-5 mt-5 md:mt-10">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600 text-center"
            >
              Get Started
            </Link>
            <button
              onClick={() => setShowContactUsModal(true)}
              className="bg-white text-black font-bold px-5 py-2 border border-black hover:bg-gray-200 text-center"
            >
              Contact Us
            </button>
          </div>
        </div>
        <img src={homeMockup} alt="Home Mockup" className="md:w-1/3 mt-0" />
      </div>
      <HowItWorks />
      <Services />
      <Membership />
      <Footer />
      {showContactUsModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"></div>
      )}
      <Modal
        show={showContactUsModal}
        onHide={() => setShowContactUsModal(false)}
        centered
        className="bg-white p-5 md:p-10 rounded-2xl w-full md:w-1/3 shadow-xl z-50"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-xl md:text-2xl font-bold p-2">Contact Us</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
            <FaPhoneAlt className="text-xl md:text-2xl text-blue-500 mr-3" />
            <div className="flex flex-col">
              <p className="text-gray-400">For Rental Support</p>
              <p className="text-black">+92 333 5626720 / 344 9200674</p>
            </div>
          </div>
          <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
            <FaClock className="text-xl md:text-2xl text-blue-500 mr-3" />
            <div className="flex flex-col">
              <p className="text-gray-400">The Office Hours</p>
              <p className="text-black">Mon - Sat 8am to 6pm</p>
            </div>
          </div>
          <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
            <FaEnvelope className="text-xl md:text-2xl text-blue-500 mr-3" />
            <div className="flex flex-col">
              <p className="text-gray-400">Send Us Email</p>
              <p className="text-black">info.nimbus360@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
            <FaInstagram className="text-xl md:text-2xl text-blue-500 mr-3" />
            <div className="flex flex-col">
              <p className="text-gray-400">Instagram</p>
              <p className="text-black">@nimbus.360</p>
            </div>
          </div>

          <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
            <BsWhatsapp className="text-xl md:text-2xl text-blue-500 mr-3" />
            <div className="flex flex-col">
              <p className="text-gray-400">Whatsapp</p>
              <p className="text-black">+92 333 5626720</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="w-full bg-red-500 text-white rounded-full p-3 mt-5 hover:bg-red-600"
            onClick={() => setShowContactUsModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
