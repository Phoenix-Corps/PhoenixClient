"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { ButtonHollow } from "@/components/Buttons/ButtonHollow";

import { useTransactionHandler } from "@/components/context/TransactionHandlerContext";
import { useDashboardContext } from "@/components/context/DashboardContext";
import { useBlockchainContext } from "@/components/context/BlockchainContext";

import { useEthersSigner } from "@/services/useEthersSigner";
import { claim } from "@/services/walletService";

import { ClaimInfo, PoolInfo } from "@/types/types";

import "./page.css";

const Item = (props: {
  pool: PoolInfo;
  claimInfo: ClaimInfo;
  index: number;
}) => {
  const signer = useEthersSigner();
  const txHandler = useTransactionHandler();
  const { resetClaimInfo, userInfo } = useDashboardContext();

  const claimType = useMemo(() => {
    if (!props.claimInfo.claimable.isZero()) return -1; // claimable
    if (
      props.claimInfo.totalPayment.comparedTo(
        props.claimInfo.claimedPayment
      ) !== 0
    )
      return 0; // pending
    return 1; // total
  }, [props.claimInfo]);
  const amount = useMemo(() => {
    if (claimType === -1) return props.claimInfo.claimable;
    if (claimType === 0)
      return props.claimInfo.totalPayment.minus(props.claimInfo.claimedPayment);
    return props.claimInfo.totalPayment;
  }, [claimType, props.claimInfo]);

  const onClaimDone = useCallback(
    (success: boolean) => {
      if (success && userInfo) resetClaimInfo(userInfo.address);
    },
    [userInfo, resetClaimInfo]
  );
  const handleClaim = useCallback(
    (id: number) => {
      if (signer)
        txHandler.setTx(
          "Claiming payment",
          "Payment claimed",
          claim(signer, id),
          onClaimDone
        );
    },
    [signer]
  );

  return (
    <div
      className={`gridItem flex items-center ${
        props.index === 0 ? "first" : ""
      }`}
    >
      <div className="text-3xl column_project">
        {props.pool.projectInfo!.name}
      </div>
      <div className="flex column_amount justify-between items-center">
        <div className="smallVisible">Amount</div>
        <div className="flex">
          <div className="flex rounded-full bg-white color_textAccent py-1 px-3">
            <Image
              src={props.pool.token.logo}
              alt={props.pool.token.symbol}
              width={24}
              height={24}
              className="mr-2"
            />
            {amount.toString()} {props.pool.token.symbol}
          </div>
        </div>
      </div>
      <div className="flex column_status text-right justify-between items-center">
        <div className="smallVisible">Status</div>
        {claimType === -1 && (
          <ButtonHollow
            mainText="CLAIM"
            width={100}
            className="!p-2 color_text stroke_text"
            onClick={() => handleClaim(props.pool.id)}
          />
        )}
        {claimType === 0 && <div className="text-xl opacity-60">Pending</div>}
        {claimType === 1 && <div className="text-xl">Claimed</div>}
      </div>
    </div>
  );
};

export default function Page() {
  const { fetchAllPoolInfo } = useBlockchainContext();
  const { fetchClaimInfo, claimInfo, userInfo } = useDashboardContext();

  //const pools = useMemo(() => mock_claim_projects(), []);
  //const claimInfo = useMemo(() => mock_claim_claimInfo().map(c => c.claim), []);
  const [pools, setPools] = useState<PoolInfo[]>([]);

  useEffect(() => {
    if (userInfo) fetchClaimInfo(userInfo.address);
    fetchAllPoolInfo()
      .then((poolData: PoolInfo[]) => setPools(poolData))
      .catch((err: any) => console.error(err));
  }, [userInfo]);

  return (
    <div className="din color_text page-container flex flex-col items-center">
      <div className="text-5xl mb-5">MY CLAIMS</div>
      <div className="gridItem-container rounded px-5">
        <div className="smallHidden">
          <div className="flex h-[50px] items-center py-3 text-base opacity-60">
            <div className="column_project">Project</div>
            <div className="column_amount">Amount</div>
            <div className="column_status text-right">Status</div>
          </div>
        </div>

        {claimInfo &&
          claimInfo.map((c, idx) => (
            <Item key={idx} index={idx} pool={pools[idx]} claimInfo={c} />
          ))}
      </div>
    </div>
  );
}
