import React from "react";
import Image from "next/image";

import DISCORD from "@/../public/images/discord-white.png";
import TWITTER from "@/../public/images/twitter-white.png";
import TELEGRAM from "@/../public/images/telegram-white.png";
const Footer = () => {
  return (
    <>
      <footer className="w-full mx-auto flex justify-center items-center footer-background-image">
        <div className="buy-footer-wrapper">
          <a
            href="https://discord.gg/f8WQJyZGy8"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <div className="buy-icon-wrapper">
              <Image
                alt="cursor discord"
                className="social-icon"
                src={DISCORD}
                width={18}
                height={11}
              />
            </div>
          </a>
          <a
            href="https://x.com/PhoenixCorpsHQ"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <div className="buy-icon-wrapper">
              <Image
                alt="cursor twitter"
                className="social-icon"
                src={TWITTER}
                width={14}
                height={13}
              />
            </div>
          </a>
          <a
            href="https://t.me/PhoenixcorpsOfficial"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <div className="buy-icon-wrapper">
              <Image
                alt="cursor telegram"
                className="social-icon"
                src={TELEGRAM}
                width={15}
                height={12}
              />
            </div>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
