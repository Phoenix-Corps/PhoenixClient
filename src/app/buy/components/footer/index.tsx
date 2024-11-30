import React from "react";
import { Socials } from "@/components-new-design/reusable-components/socials";
const Footer = () => {
  return (
    <>
      <footer className="w-full mx-auto flex justify-center items-center footer-background-image p-5">
        <Socials
          discord="https://discord.gg/f8WQJyZGy8"
          twitter="https://x.com/PhoenixCorpsHQ"
          telegram="https://t.me/PhoenixcorpsOfficial"
        />
      </footer>
    </>
  );
};

export default Footer;
