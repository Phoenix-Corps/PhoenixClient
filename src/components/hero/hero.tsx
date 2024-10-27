"use client";

import Logo from "../../../public/Logo.svg";
import Down from "../../../public/Down indicator.svg";
import { useRouter } from "next/navigation";

const Hero = () => {

  return (
    <section>
      <Logo className="w-[100%] h-full object-contain hero-image" />
      <Down style={{ margin: "auto" }} />
    </section>
  );
};

export default Hero;
