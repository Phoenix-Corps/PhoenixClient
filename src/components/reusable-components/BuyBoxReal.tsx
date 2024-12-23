"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useBlockchainContext } from "@/components/context/BlockchainContext";
import { PoolInfo } from "@/services/walletService";

import { ButtonYellow } from "./ButtonYellow";

import PhoenixBlueBox from "@public/images/phoenix-logo-3.png";
import { formatDate } from "@/utils/format";

const ProjectCard: React.FC<PoolInfo> = ({
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
    <div className="flex flex-col start-project-box nm:w-[400px] w-full h-[484px] rounded py-[24px] px-[24px] text-[rgba(245,248,252,1)]">
      <div className="flex justify-between">
        <div>
          <div className="din text-[36px] text-white font-bold uppercase leading-[43px]">
            {projectInfo?.name}
          </div>
          <div className="din text-[24px] text-white font-bold uppercase leading-[28px]">
            Upcoming
          </div>
        </div>
        <div className="mini-blue-box w-[80px] h-[80px] rounded flex justify-center items-center">
          <Image
            src={projectInfo?.logo ?? PhoenixBlueBox.src}
            width={55}
            height={63}
            alt="project-logo"
          />
        </div>
      </div>
      <div className="mini-blue-box-divider my-[24px]" />
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
      <div className="mini-blue-box-divider my-[24px]" />
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

export const ProjectsSection: React.FC = () => {
  const { fetchAllPoolInfo } = useBlockchainContext();
  const [projects, setProjects] = useState<PoolInfo[]>([]);

  useEffect(() => {
    fetchAllPoolInfo()
      .then(poolData => {
        setProjects(poolData);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {projects.length ? (
        projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))
      ) : (
        <div className="text-center text-white p-8">LOADING PROJECTS...</div>
      )}
    </>
  );
};
