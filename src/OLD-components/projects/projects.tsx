"use client";

import { useBlockchainContext } from "@/components/context/BlockchainContext";
import { PoolInfo } from "@/services/walletService";
import { BigNumber } from "ethers";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./projects.css";
import USDClogo from "@public/buy/usd-coin.svg";
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

  const renderButton = () => {
    // TODO: statuses
    return (
      <Link href={`/buy?poolId=${id}`} className="project-action active">
        BUY NOW
      </Link>
    );
  };

  const getDateString = (date: Date) => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const hour = date.getHours();
    const minut = date.getMinutes();
    return `${month} ${day} - ${hour}:${minut}`;
  };

  return (
    <div className="project-card w-[300px]">
      <div className="project-header">
        <Image
          src={projectInfo?.logo ?? ""}
          alt={projectInfo?.logo ?? ""}
          width={40}
          height={40}
          className="project-logo"
        />
        <div className="project-title">
          <h3 className="project-name">{projectInfo?.name}</h3>
        </div>
      </div>
      <div className="detail-row">
        <span>ROUND</span>
        <span>{roundId}</span>
      </div>
      <div className="project-details">
        <div className="detail-row">
          <span>ROUND START</span>
          <span>{getDateString(roundStartDate)}</span>
        </div>
        <div className="detail-row">
          <span>ROUND END</span>
          <span>{getDateString(roundEndDate)}</span>
        </div>
        <div className="detail-row items-center">
          <span>ROUND PRICE</span>
          <span className="flex justify-center items-center">
            {" "}
            <USDClogo width={40} height={40} />
            {currentRound.voucherPrice}
          </span>
        </div>
        <div className="detail-row">
          <span>TOTAL RAISED</span>
          <span>{`${percentage.toFixed(2)}%`}</span>
        </div>
      </div>
      {renderButton()}
    </div>
  );
};

const ProjectsSection: React.FC = () => {
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
    <section className="projects-section flex flex-col">
      <h2 className="title text-yellow-r">Active & Upcoming</h2>
      <div className="divider" />
      <div style={{ height: "10px" }} />
      <div className="flex justify-center space-x-4 project-responsive">
        {projects.length ? (
          projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))
        ) : (
          <div className="text-center text-white p-8">LOADING PROJECTS...</div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
