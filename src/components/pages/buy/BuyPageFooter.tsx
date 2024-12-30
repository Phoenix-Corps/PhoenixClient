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
            props.poolInfo?.projectInfo?.socials.discord ??
            pageConfig.socials.discord
          }
          twitter={
            props.poolInfo?.projectInfo?.socials.twitter ??
            pageConfig.socials.twitter
          }
          telegram={
            props.poolInfo?.projectInfo?.socials.telegram ??
            pageConfig.socials.telegram
          }
        />
      </footer>
    </>
  );
};
