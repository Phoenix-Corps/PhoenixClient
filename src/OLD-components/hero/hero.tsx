"use client";

import Logo from "../../../public/Logo.svg";
import Down from "../../../public/Down indicator.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="sm:text-right text-center">
      <span className="button-container button-container-yellow m-[1%] absolute shinobi-button">
        <Link className="button button-yellow" href="/dashboard">
          <span className="button-text">Open Dashboard</span>
        </Link>
      </span>
      <Logo className="sm:w-[70%] w-full m-auto h-full object-contain hero-image" />
      <Down style={{ margin: "auto" }} />
    </section>
  );
};

export default Hero;
