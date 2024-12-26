"use client";

import React, { useEffect, useState } from "react";

import { useBlockchainContext } from "@/components/context/BlockchainContext";
import { ProjectCard } from "./ProjectCard";
import { PoolInfo } from "@/types/types";

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
