import React, { FC, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { PoolInfo } from "@/services/walletService";
import { useBlockchainContext } from "@/context/BlockchainContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { useEthersProvider } from "@/services/useEthersProvider";
import Decimal from "decimal.js";

const ClaimsTable: React.FC = () => {
  const { fetchAllPoolInfo } = useBlockchainContext();
  const { fetchClaimInfo, claimInfo, userInfo } = useDashboardContext();
  const provider = useEthersProvider();
  const [projects, setProjects] = useState<PoolInfo[]>([]);

  useEffect(() => {
    if (provider && userInfo) {
      fetchClaimInfo(userInfo.address);
    }
    fetchAllPoolInfo()
      .then((poolData) => {
        setProjects(poolData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userInfo, provider]);

  const claimsData = useMemo(() => {
    if (claimInfo && projects && claimInfo.length > 0 && projects.length > 0) {
      return projects.map((project, index) => {
        const projClaim = claimInfo[index]; 
        if (!projClaim) {
          return null; 
        }
        let status = "";
        let color = "";
        let amount = new Decimal(0);

        const totalPayment = projClaim.totalPayment;
        const claimedPayment = projClaim.claimedPayment;
        const claimable = projClaim.claimable;
        console.log(totalPayment, claimedPayment, claimable);

        const tokenDecimals = project.token.decimals || 18; // Default to 18 if undefined

        if (claimable.comparedTo(0) > 0) {
          status = "CLAIMABLE";
          color = "yellow";
          amount = claimable;
        } else if (
          claimable.comparedTo(0) === 0 &&
          totalPayment.comparedTo(claimedPayment) > 0
        ) {
          status = "PENDING";
          color = "red";
          amount = totalPayment.minus(claimedPayment);
        } else {
          status = "CLAIMED";
          color = "green";
          amount = totalPayment;
        }

        const amountFormatted = amount.dividedBy(Decimal.pow(10, tokenDecimals));

        return {
          project,
          status,
          color,
          amount: amountFormatted,
        };
      });
    } else {
      return [];
    }
  }, [claimInfo, projects]);

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
            {claimsData &&
              claimsData.map(
                (data, index) =>
                  data && (
                    <tr key={index} className="border-b">
                      <td className="p-4 pl-0">{data.project.projectInfo?.name}</td>
                      <td className="p-4 pl-0 flex flex-wrap gap-4">
                        <div
                          key={data.project.id}
                          className="flex items-center gap-2"
                        >
                          <span>
                            <Image
                              src={data.project.token.logo}
                              alt={data.project.token.logo}
                              width={20}
                              height={20}
                              className="project-logo"
                            />
                          </span>
                          <span>{data.amount.toString()}</span>
                        </div>
                      </td>
                      <td key={index}>
                        <div className={`btn-${data.color}-grad-container`}>
                          {data.status === "CLAIMABLE" ? (
                            <button className={`btn-${data.color}-grad px-10`}>
                              <span className={`btn-${data.color}-grad-text`}>
                                {data.status}
                              </span>
                            </button>
                          ) : (
                            <span className={`btn-${data.color}-grad px-10`}>
                              <span className={`btn-${data.color}-grad-text`}>
                                {data.status}
                              </span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClaimsTable;
