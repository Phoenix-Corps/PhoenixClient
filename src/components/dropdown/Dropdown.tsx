"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./dropdown.css";
import Logo from "../../../public/Vector 1.svg";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleDropdown}
        className="dropdown-toggle"
        style={{ borderRadius: isOpen ? "20px 20px 0px 0px" : "20px" }}
      >
        <p
          style={{
            fontFamily: "__Noto_Serif_cc0b7e",
            fontSize: "12px",
            fontWeight: "700",
            lineHeight: "16.34px",
            textAlign: "left",
          }}
        >
          SELECT LANGUAGE
        </p>
        <Logo style={{ marginTop: "6px" }} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#option1" className="dropdown-item">
            ENGLISH
          </a>
          <a href="#option2" className="dropdown-item">
            DEUTSCH
          </a>
          <a href="#option3" className="dropdown-item">
            ESPAÑOL
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
