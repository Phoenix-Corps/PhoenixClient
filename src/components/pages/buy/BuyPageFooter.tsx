import React from "react";

import { Socials } from "@/components/Page/Socials";

import { PoolInfo } from "@/types/types";

import pageConfig from "@/config/page.json";

export const BuyPageFooter = (props: { poolInfo?: PoolInfo }) => {
  return (
    <>
      <footer className="w-full mx-auto flex justify-center items-center footer-background-image p-5">
        <Socials
          discord={
            props.poolInfo?.projectInfo?.discord ?? pageConfig.socials.discord
          }
          twitter={
            props.poolInfo?.projectInfo?.twitter ?? pageConfig.socials.twitter
          }
          telegram={
            props.poolInfo?.projectInfo?.telegram ?? pageConfig.socials.telegram
          }
        />
      </footer>
    </>
  );
};
