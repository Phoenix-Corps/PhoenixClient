import React from "react";
import Image from "next/image";
import PhoenixLOGO from "@public/buy/phoenix-logo.png";
import { Logo } from "@/components-new-design/reusable-components/Logo";

const Header = () => {
  return (
    <div className="p-10">
      <Logo width={162} />
    </div>
  );
};

export default Header;
