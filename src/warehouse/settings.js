import { React, useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Settings = () => {
  return (
    <div className="flex flex-col w-full min-h-screen p-5">
      <div className="flex flex-col justify-center p-5 border shadow-md rounded-xl">
        <div className="flex items-center justify-between p-5 w-full">
          <p className="text-2xl font-bold">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
