"use client";

import { useBlockchainContext } from "@/context/BlockchainContext";
import { PoolInfo } from "@/services/walletService";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./projects.css";

const ProjectCard: React.FC<PoolInfo> = ({
  id,
  projectInfo,
  currentRound,
  token
}) => {
  const renderButton = () => {
    // TODO: statuses
    return (
      <Link href={`/buy?poolId=${id}`} className="project-action active">
        BUY NOW
      </Link>
    );
  };

  return (
    // TODO: round infos
    <div className="project-card w-[300px]">
      <div className="project-header">
        <Image
          src={token.logo}
          alt={token.symbol}
          width={40}
          height={40}
          className="project-logo"
        />
        <div className="project-title">
          <h3 className="project-name">{projectInfo.name}</h3>
        </div>
      </div>
      <div className="project-details">
        <div className="detail-row">
          <span>ROUND</span>
          <span>{"--"}</span>
        </div>
        <div className="detail-row">
          <span>ROUND PRICE</span>
          <span>{"--"}</span>
        </div>
        <div className="detail-row">
          <span>TOTAL RAISED</span>
          <span>{"--"}</span>
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
      <div className="flex justify-center space-x-4">
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
