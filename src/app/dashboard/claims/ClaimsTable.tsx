import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { PoolInfo } from "@/services/walletService";
import { useBlockchainContext } from "@/context/BlockchainContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { useEthersProvider } from "@/services/useEthersProvider";

const ClaimsTable: React.FC = () => {
  const { fetchAllPoolInfo } = useBlockchainContext();
  const { fetchClaimInfo, claimInfo } = useDashboardContext();
  const provider = useEthersProvider();
  const [projects, setProjects] = useState<PoolInfo[]>([]);

  useEffect(() => {
    if (provider) {
      fetchClaimInfo("0x0");
    }
    fetchAllPoolInfo()
      .then(poolData => {
        setProjects(poolData);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const getClaimInfo = (projClaim: any) => {
    if (projClaim.claimable > 0) {
      const amount = projClaim.claimable;
      return { color: "yellow", text: "CLAIMABLE", amount };
    } else if (
      projClaim.claimable == 0 &&
      projClaim.totalPayment > projClaim.claimedPayment
    ) {
      const amount = projClaim.totalPayment - projClaim.claimedPayment;
      return { color: "red", text: "PENDING", amount };
    } else {
      const amount = projClaim.totalPayment;
      return { color: "green", text: "CLAIMED", amount };
    }
  };

  return (
    <>
      <div className="table-gradient-container p-8 mt-8 rounded-tl-[40px] md:p-12 md:rounded-tl-[60px] lg:p-14 lg:rounded-tl-[80px] overflow-x-auto">
        <table className="w-full table-auto border-collapse text-lg font-sans border-spacing-y-2 whitespace-nowrap">
          <thead>
            <tr>
              <th className="text-[14px] md:text-base lg:text-lg text-left w-2/5">
                Project
              </th>
              <th className="text-[14px] md:text-base lg:text-lg text-left w-2/5">
                Amount
              </th>
              <th className="text-[14px] md:text-base lg:text-lg text-left w-1/5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {projects &&
              claimInfo &&
              projects.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 pl-0">{row.projectInfo.name}</td>
                  <td className="p-4 pl-0 flex flex-wrap gap-4">
                    <div key={row.id} className="flex items-center gap-2">
                      <span>
                        <Image
                          src={row.token.logo}
                          alt={row.token.symbol}
                          width={40}
                          height={40}
                          className="project-logo"
                        />
                      </span>
                      <span>{row.token.symbol}</span>
                      <span>{getClaimInfo(claimInfo[index]).amount}</span>
                    </div>
                  </td>
                  <td key={index}>
                    <div
                      className={`btn-${
                        getClaimInfo(claimInfo[index]).color
                      }-grad-container`}
                    >
                      <button
                        className={`btn-${
                          getClaimInfo(claimInfo[index]).color
                        }-grad px-10`}
                      >
                        <span
                          className={`btn-${
                            getClaimInfo(claimInfo[index]).color
                          }-grad-text`}
                        >
                          {getClaimInfo(claimInfo[index]).text}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClaimsTable;
