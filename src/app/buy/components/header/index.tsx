import React from "react";
import Image from "next/image";
import PhoenixLOGO from "@public/buy/phoenix-logo.png";

const Header = () => {
  return (
    <>
      <header className="w-full mx-asuto flex justify-center items-center header-wrapper">
        <Image
          src={PhoenixLOGO}
          alt="PhoenixLOGO"
          className="phoenix-logo-image"
          width={49}
          height={60}
        />
      </header>
    </>
  );
};

export default Header;
