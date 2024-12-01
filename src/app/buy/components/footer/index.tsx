import React, { useMemo } from "react";
import { Socials } from "@/components-new-design/reusable-components/socials";
import { PoolInfo } from "@/services/walletService";

const Footer = (props: {
  poolInfo?: PoolInfo;
}) => {


  return (
    <>
      <footer className="w-full mx-auto flex justify-center items-center footer-background-image p-5">
        <Socials
          discord={props.poolInfo?.projectInfo?.discord ?? "https://discord.gg/f8WQJyZGy8"}
          twitter={props.poolInfo?.projectInfo?.twitter ?? "https://x.com/PhoenixCorpsHQ"}
          telegram={props.poolInfo?.projectInfo?.telegram ?? "https://t.me/PhoenixcorpsOfficial"}
        />
      </footer>
    </>
  );
};

export default Footer;
