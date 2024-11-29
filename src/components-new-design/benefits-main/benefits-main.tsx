import React from "react";
import BenefitsIcon from "@public/benefits-icon.svg";
import BenefitsPercentage from "@public/benefits-percentage.svg";

const BenefitsMain: React.FC = () => {
  return (
    <section className="bg-[#F6F9FFD9]/85 md:py-20 md:px-40 xs:px-10 xs:py-10">
      <div className="flex flex-col md:flex-row w-full p-5">
        <div className="flex-1 flex justify-center">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div
                className="font-benefits"
                style={{ transform: "scaleY(1.2)" }}
              >
                benefits
              </div>
              <BenefitsIcon className="self-center ml-2" />
            </div>
            <div
              className="font-representatives mb-10"
              style={{ transform: "scaleY(1.2)" }}
            >
              for Phoenix' representatives
            </div>
            <div className="text-[#184863] text-[16px] mb-8 max-w-[530px]">
              Representatives of all ranks of all promotion teams will receive a
              % in commissions, either in stablecoin or native token (Ethereum
              or BNB for example) depending on the project being promoted in
              proportion to their effectiveness and reach, creating a{" "}
              <b>"Work hard, earn hard"</b> situation for every participant.
            </div>
            <div className="text-[#184863]/50 text-[12px]">
              No money will ever be required to become a representative.
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:mt-0 md:mt-20 sm:mt-20 xs:mt-20 pt-5">
          <BenefitsPercentage />
        </div>
      </div>
    </section>
  );
};

export default BenefitsMain;
