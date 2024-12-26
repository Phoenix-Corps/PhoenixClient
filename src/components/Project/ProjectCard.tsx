"use client";

import React from "react";
import Image from "next/image";

import { ButtonYellow } from "@/components/Buttons/ButtonYellow";

import { formatDate } from "@/utils/format";
import { PoolInfo } from "@/types/types";

export const ProjectCard: React.FC<PoolInfo> = ({
  id,
  projectInfo,
  currentRound,
  token
}) => {
  const roundId = currentRound.id;
  const roundStartDate = new Date(currentRound.roundStart * 1000);
  const roundEndDate = new Date(currentRound.roundEnd * 1000);
  const available = currentRound.available;
  const goal = currentRound.goal;
  const raised = goal.sub(available);
  const percentage = goal.gt(0) ? raised.div(goal).mul(100) : 0;

  return (
    <div className="flex flex-col blurred-box nm:w-[400px] w-full h-[484px] rounded py-[24px] px-[24px] text-[rgba(245,248,252,1)]">
      <div className="flex justify-between">
        <div>
          <div className="din text-[36px] text-white font-bold uppercase leading-[43px]">
            {projectInfo?.name}
          </div>
          <div className="din text-[24px] text-white font-bold uppercase leading-[28px]">
            Upcoming
          </div>
        </div>
        <div className="blurred-box w-[80px] h-[80px] rounded flex justify-center items-center">
          {!!projectInfo?.logo && (
            <Image
              src={projectInfo?.logo!}
              width={55}
              height={63}
              alt="project-logo"
            />
          )}
        </div>
      </div>
      <div className="box-divider my-[24px]" />
      <div className="flex gap-4 flex-col">
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] text-white">
          <div className="opacity-60">Round Start:</div>
          <div>???</div>
        </div>
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] text-white">
          <div className="opacity-60">Round End:</div>
          <div>???</div>
        </div>
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] text-white">
          <div className="opacity-60">Round Price:</div>
          <div className="flex">
            <img src={token.logo} className="w-[20px] h-[20px] mr-1" />
            ???
          </div>
        </div>
        <div className="flex justify-between aeroport font-normal text-[16px] leading-[20px] text-white">
          <div className="opacity-60">Round Goal:</div>
          <div className="flex">
            <img src={token.logo} className="w-[20px] h-[20px] mr-1" />
            ???
          </div>
        </div>
      </div>
      <div className="box-divider my-[24px]" />
      <div className="flex gap-4 flex-col">
        <div className="flex justify-between items-center aeroport font-normal text-[16px] leading-[20px] text-white">
          <div className="opacity-60">Round Raised:</div>
          <div className="din font-bold leading-[48px] text-[40px] tracking-[-0.02px]">
            ???
          </div>
        </div>

        <ButtonYellow mainText="Upcoming" miniBox={true} />
      </div>
    </div>
  );
};
