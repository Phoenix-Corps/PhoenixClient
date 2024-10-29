import React from "react";
import Image from "next/image";
import EngFlag from "@/app/(presale)/buy/public/Eng-flag.png";
import PhoenixLOGO from "@/app/(presale)/buy/public/phoenix-logo.png";

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
        <div className="flex gap-3.5 items-center">
          <div className="border-flag">
            <Image src={EngFlag} alt="EngFlag" className="eng-flag-image" />
          </div>
          <button className="sign-in-color">Sing in</button>
        </div>
      </header>
    </>
  );
};

export default Header;
