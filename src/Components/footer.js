import React from "react";
import Logo from "../Assets/LogoWhite.png";
import arrow from "../Assets/arrow.png";
import decorFooter from "../Assets/decorFooter.png";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import Timings from "../Assets/Timings.png";
import Mail from "../Assets/Mail.png";
import contactSupport from "../Assets/contactSupport.png";

const Footer = () => {
  return (
    <div className="footer bg-black text-white flex-col items-center p-3">
      <div className="flex flex-row items-center justify-between p-20 pb-0">
        <img src={Logo} alt="Logo" className="h-24 p-4" />
        <div className="flex flex-col border-l-4 border-blue-400 pl-3">
          <h1 className="text-2xl font-bold text-white-900">
            We are here to help you
          </h1>
          <p className="text-lg text-gray-400">
            The best way to get in touch with us is by email.<br></br> We are
            here to answer any questions you may have about Nimbus360.
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between p-20">
        <div className="flex flex-col w-1/4">
          <h1 className="text-2xl font-bold text-white-900">About Nimbus360</h1>
          <img
            src={decorFooter}
            alt="decorFooter"
            className="mb-3 h-3 w-8 mt-3"
          />
          <p className="text-lg text-gray-400">
            We Tailor the Software Needs of your Restaurant, Retail, and
            Warehouse
          </p>
          <div className="flex flex-row items-center mt-3">
            <BsLinkedin
              size={28}
              className="text-2xl text-white mr-3 bg-gray-600 p-2 rounded-full"
            />
            <FaFacebookF
              size={28}
              className="text-2xl text-white mr-3 bg-gray-600 p-2 rounded-full"
            />
            <FaTwitter
              size={28}
              className="text-2xl text-white mr-3 bg-gray-600 p-2 rounded-full"
            />
            <FaInstagram
              size={28}
              className="text-2xl text-white mr-3 bg-gray-600 p-2 rounded-full"
            />
            <FaYoutube
              size={28}
              className="text-2xl text-white mr-3 bg-gray-600 p-2 rounded-full"
            />
            <BsWhatsapp
              size={28}
              className="text-2xl text-white bg-gray-600 p-2 rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col w-1/4">
          <h1 className="text-2xl font-bold text-white-900">Useful Links</h1>
          <img
            src={decorFooter}
            alt="decorFooter"
            className="mb-3 h-3 w-8 mt-3"
          />
          <ul className="text-lg text-gray-400 flex flex-col leading-10 list-disc list-inside">
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Latest News</li>
            <li className="cursor-pointer">Our Process</li>
            <li className="cursor-pointer">Terms & Conditions</li>
            <li className="cursor-pointer">Protections & Coverages</li>
          </ul>
        </div>

        <div className="flex flex-col w-1/4">
          <h1 className="text-2xl font-bold text-white-900">Explore More</h1>
          <img
            src={decorFooter}
            alt="decorFooter"
            className="mb-3 h-3 w-8 mt-3"
          />
          <ul className="text-lg text-gray-400 flex flex-col leading-10 list-disc list-inside">
            <li className="cursor-pointer">Signup or Register</li>
            <li className="cursor-pointer">Get Nimbus360</li>
            <li className="cursor-pointer">Nimbus Pricing</li>
            <li className="cursor-pointer">Quick User Guide</li>
            <li className="cursor-pointer">Read FAQ's</li>
          </ul>
        </div>

        <div className="flex flex-col w-1/4">
          <h1 className="text-2xl font-bold text-white-900">Get in Touch</h1>
          <img
            src={decorFooter}
            alt="decorFooter"
            className="mb-3 h-3 w-8 mt-3"
          />
          <ul className="text-lg text-gray-400 flex flex-col">
            <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
              <img
                src={contactSupport}
                alt="contactSupport"
                className="h-6 w-6 mr-3"
              />
              <div className="flex flex-col">
                <p className="text-gray-400">For Rental Support</p>
                <p className="text-white">+92 333 5626720 / 344 9200674</p>
              </div>
            </div>
            <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
              <img
                src={Timings}
                alt="contactSupport"
                className="h-6 w-6 mr-3"
              />
              <div className="flex flex-col">
                <p className="text-gray-400">The Office Hours</p>
                <p className="text-white">Mon - Sat 8am to 6pm</p>
              </div>
            </div>
            <div className="flex flex-row items-center border-b border-gray-700 pt-3 pb-3">
              <img src={Mail} alt="Mail" className="h-6 w-6 mr-3" />
              <div className="flex flex-col">
                <p className="text-gray-400">Send Us Email</p>
                <p className="text-white">info.nimbus360@gmail.com</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
