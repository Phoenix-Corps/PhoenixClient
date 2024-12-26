import React from "react";

import { Header } from "@/components/Page/Header";

import { ProjectsSection } from "@/components/Project/ProjectSection";
import { LandingSection } from "./landing-section";
import { BlueBoxMain } from "./BlueBoxMain";

import "./upper-main.css";

export const Main = () => {
  return (
    <div className="main-air-wrapper">
      <Header />
      <div className="flex justify-center flex-col ">
        <LandingSection />
        <div className="font-title-main text-center din uppercase mt-[80px] ">
          How to get started as a project
        </div>
        <div className="flex flex-wrap gap-y-3 mt-[50px] gap-[19px] nm:w-auto w-full justify-center">
          <div className="flex flex-wrap gap-y-3 gap-[19px] nm:w-auto w-full justify-center">
            <BlueBoxMain
              number={"1"}
              title={"come up with a concept"}
              description={
                "Come up with a good concept, name, brand, logo etc."
              }
            />
            <BlueBoxMain
              number={"2"}
              title={"Set project goals"}
              description={
                "Set realistic, fair and sustainable goals for both the project and it's future investors"
              }
            />
          </div>
          <div className="flex flex-wrap gap-y-3 gap-[19px] nm:w-auto w-full justify-center">
            <BlueBoxMain
              number={"3"}
              title={"Sign up"}
              description={
                'Contact us through the "Sign up as a project form" (that text should be a link that links to the form for signing up as a project'
              }
            />

            <div className="orange-project-box nm:w-[296px] w-full max-w-[296px] h-[334px] rounded py-[24px] px-[24px]  text-[rgba(245,248,252,1)]">
              <div className="font-title-orange din uppercase">
                Enjoy the ride
              </div>
              <div className="aeroport mt-[12px] font-description-orange ">
                Enjoy the ride and let us (Phoenix) find funds for you to
                manifest your plans in a truly organic and community driven
                method while working as hard as you can on giving us (Phoenix)
                as much promotional as possible
              </div>
            </div>
          </div>
        </div>
        <div className="font-title-main text-center din uppercase mt-[80px] ">
          active & upcoming projects
        </div>
        <div className="flex flex-wrap justify-center gap-[19px] m-auto mt-[50px]">
          <ProjectsSection />
        </div>
        <div className="flex md:flex-row flex-col w-full mt-[15%] gap-[20%] p-5 md:p-20">
          <div className="din font-bold md:text-[97px] text-[60px] leading-[89px] tracking-[-0.04rem] text-[rgba(245,248,252,1)] uppercase nm:w-1/2 w-full text-center md:text-left">
            The power of true and fair community fundraising
          </div>
          <div className="aeroport font-normal text-[16px] leading-[20px] tracking-[-0.03rem] text-[rgba(216,227,244,1);] nm:w-[40%] w-full">
            <b>Phoenix</b> empowers it's army of representatives to earn money
            without investing money by{" "}
            <b>
              promoting projects, fostering community growth and sharing earned
              commission money
            </b>{" "}
            in a honest and proportional way to ensure sustainability for both
            Phoenix and the projects it will gather funds for and for the
            investors that will be investing in these private sales.
          </div>
        </div>
      </div>
    </div>
  );
};
