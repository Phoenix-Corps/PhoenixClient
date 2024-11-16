"use client";

import Logo from "../../../public/Logo.svg";
import Down from "../../../public/Down indicator.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {

  return (
    <section className="sm:text-right text-center">
      <span className="button-container button-container-yellow sm:m-[2%]">
          <Link className="button button-yellow" href="/dashboard">
            <span className="button-label">Sign up for the</span>
            <span className="button-text">Shinobi alliance</span>
          </Link>
        </span>
      <Logo className="w-[100%] h-full object-contain hero-image" />
      <Down style={{ margin: "auto" }} />
    </section>
  );
};

export default Hero;
