"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./division.css";
import { useDashboardContext } from "@/components/context/DashboardContext";
import DivisionTable from "./DivisionTable";
import RecruitMenu from "./RecruitMenu";

const Division = () => {
  const [showRecruitMenu, setShowRecruitMenu] = useState(false);
  return (
    <div className="mt-28 md:mt-20 lg:mt-36 px-4 md:px-24">
      <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
        My Division
      </h1>
      {!showRecruitMenu && (
        <div className="flex justify-end">
          <button
            className="recruit-button w-48 h-11 rounded-full"
            onClick={() => setShowRecruitMenu(true)}
          >
            <span className="uppercase size-4 font-bold">Recruit menu</span>
          </button>
        </div>
      )}
      {showRecruitMenu && (
        <RecruitMenu onClose={() => setShowRecruitMenu(false)} />
      )}

      <DivisionTable />
    </div>
  );
};

export default Division;
