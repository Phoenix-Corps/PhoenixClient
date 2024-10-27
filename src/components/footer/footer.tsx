import Image from "next/image";
import DISCORD from "../../../public/images/discord.png";
import TWITTER from "../../../public/images/twitter.png";
import TELEGRAM from "../../../public/images/telegram.png";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="social-wrapper">
        <a
          href="https://discord.gg/f8WQJyZGy8"
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <div className="social-icon-wrapper">
            <Image
              alt="cursor discord"
              className="social-icon"
              src={DISCORD}
              width={64}
              height={64}
            />
          </div>
        </a>
        <a
          href="https://x.com/PhoenixCorpsHQ"
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <div className="social-icon-wrapper">
            <Image
              alt="cursor twitter"
              className="social-icon"
              src={TWITTER}
              width={64}
              height={64}
            />
          </div>
        </a>
        <a
          href="https://t.me/PhoenixcorpsOfficial"
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <div className="social-icon-wrapper">
            <Image
              alt="cursor telegram"
              className="social-icon"
              src={TELEGRAM}
              width={64}
              height={64}
            />
          </div>
        </a>
      </div>

      <div className="footer-btns">
        <span className="button-container button-container-yellow">
          <Link className="button button-yellow" href="/dashboard">
            <span className="button-label">Sign up for the</span>
            <span className="button-text">Shinobi alliance</span>
          </Link>
        </span>
        <span className="button-container button-container-yellow">
          <button className="button button-yellow">
            <span className="button-label">Sign up as a</span>
            <span className="button-text">project or startup</span>
          </button>
        </span>
        <span className="button-container button-container-yellow">
          <button className="button button-yellow">
            <span className="button-label">apply for</span>
            <span className="button-text">country manager</span>
          </button>
        </span>
      </div>

      <div className="footer-bottom">
        <button className="docs-button">
          <span className="docs-button-text">Read The Docs</span>
        </button>
        <span className="copyright-notice">
          Copyright © 2024 PHOENIX. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
