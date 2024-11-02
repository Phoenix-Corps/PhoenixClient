"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./projects.css";
import { useEthersProvider } from "@/services/useEthersProvider";
import { getPoolList, getUserInfo } from "@/services/walletService";

interface Project {
  name: string;
  logo: string;
  roundEnding?: string;
  round?: number;
  roundPrice?: number;
  totalRaised?: string;
  status: "Active" | "Upcoming" | "Ended";
  presaleLink: string;
}

const ProjectCard: React.FC<Project> = ({
  name,
  logo,
  roundEnding,
  round,
  roundPrice,
  totalRaised,
  status,
  presaleLink
}) => {
  const renderButton = () => {
    switch (status) {
      case "Active":
        return (
          <Link href={presaleLink} className="project-action active">
            BUY NOW
          </Link>
        );
      case "Upcoming":
        return (
          <button className="project-action upcoming" disabled>
            SOON
          </button>
        );
      case "Ended":
        return (
          <button className="project-action ended" disabled>
            ENDED
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-card">
      <div className="project-header">
        <Image
          src={logo}
          alt={name}
          width={40}
          height={40}
          className="project-logo"
        />
        <div className="project-title">
          <h3 className="project-name">{name}</h3>
          {roundEnding && (
            <p className="round-ending">ROUND ENDING IN {roundEnding}</p>
          )}
          {status === "Ended" && <p className="round-ending ended">Ended</p>}
        </div>
      </div>
      <div className="project-details">
        <div className="detail-row">
          <span>ROUND</span>
          <span>{round || "--"}</span>
        </div>
        <div className="detail-row">
          <span>ROUND PRICE</span>
          <span>{roundPrice ? `$${roundPrice}` : "--"}</span>
        </div>
        <div className="detail-row">
          <span>TOTAL RAISED</span>
          <span>{totalRaised || "--"}</span>
        </div>
      </div>
      {renderButton()}
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [presales, setPresales] = useState<[]>([]);

  const provider = useEthersProvider();

  useEffect(() => {
    const fetchPresales = async () => {
      if (provider) {
        await getPoolList(provider);
        await getUserInfo(provider, "0x4F97363aCb08f6F027dC8bb93b7Feb49Ba1cF744");
      }
    };

    fetchPresales();
  }, []);

  return (
    <section className="projects-section">
      <h2 className="title text-yellow-r">Active & Upcoming</h2>
      <div className="divider" />
      <div className="projects-grid">
        {/* {presales.map((project, index) => (
          // <ProjectCard key={index} {...project} />
        ))} */}
      </div>
    </section>
  );
};

export default ProjectsSection;
