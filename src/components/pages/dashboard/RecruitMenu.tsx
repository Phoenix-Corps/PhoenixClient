"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ethers } from "ethers";

import { Select } from "@/components/Inputs/Select";
import { TextInput } from "@/components/Inputs/TextInput";
import { ButtonState } from "@/components/Buttons/ButtonState";

import { useDashboardContext } from "@/components/context/DashboardContext";
import { useTransactionHandler } from "@/components/context/TransactionHandlerContext";

import { useEthersProvider } from "@/services/useEthersProvider";
import { useEthersSigner } from "@/services/useEthersSigner";
import { getHireRankInfo, recruit } from "@/services/walletService";

import { HireRank } from "@/types/types";

export const RecruitmentMenu = () => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const { userInfo, walletAddress, fetchUserInfo } = useDashboardContext();
  const { setTx } = useTransactionHandler();

  const [ranks, setRanks] = useState<HireRank[]>([]);
  const [selectedRank, setSelectedRank] = useState<number | undefined>(
    undefined
  );
  const [address, setAddress] = useState("");

  const selectedRankInfo = useMemo(() => {
    return selectedRank !== undefined && ranks.length > 0
      ? ranks[selectedRank]
      : null;
  }, [ranks, selectedRank]);
  const recruitAddressValid = useMemo(() => {
    return ethers.utils.isAddress(address);
  }, [address]);
  const executable = useMemo(() => {
    return (
      !!selectedRankInfo &&
      recruitAddressValid &&
      userInfo!.currentRank.level > selectedRankInfo.level &&
      userInfo!.canHire &&
      (selectedRankInfo.vouchers > 0 ||
        userInfo!.currentXP.comparedTo(selectedRankInfo.hireCost) >= 0)
    );
  }, [userInfo, selectedRankInfo, recruitAddressValid]);

  const getHireInfo = useCallback(async () => {
    if (userInfo && provider) {
      const loadedRanks = await getHireRankInfo(
        provider,
        userInfo.address,
        [0, 4, 9]
      );
      setRanks(loadedRanks);
    }
  }, [userInfo, setRanks]);
  const hire = useCallback(() => {
    if (selectedRankInfo && signer && executable) {
      const tx = recruit(address, selectedRankInfo!.id, signer);
      setTx("Hiring in progress...", "Hire successful!", tx, () =>
        fetchUserInfo(walletAddress!)
      );
    }
  }, [address, selectedRankInfo, signer, executable, walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      getHireInfo();
      fetchUserInfo(walletAddress);
    }
  }, [walletAddress]);

  return (
    <>
      <div className="pr-10">
        <div className="text-2xl">RECRUITMENT</div>
        <div className="flex text-s">
          <div>{userInfo?.currentXP.toFixed(0)}</div>
          <div className="pl-2 opacity-60">SPENDABLE XP</div>
        </div>
      </div>

      <Select
        selectedIndex={selectedRank}
        options={ranks.map(r => r.name)}
        placeholder="DESIRED RANK"
        className="w-[200px]"
        onSelect={setSelectedRank}
      />
      <TextInput
        value={address}
        placeholder="NEW RECRUIT'S WALLET ADDRESS"
        className="w-[300px] grow"
        onChange={setAddress}
      />

      <div className="flex flex-col items-center justify-center px-10">
        <div className="text-2xl">
          {selectedRankInfo?.hireCost.toFixed(0) ?? "???"} XP
        </div>
        <div className="flex text-s">
          <div>{selectedRankInfo?.vouchers ?? "???"}</div>
          <div className="pl-2 opacity-60">VOUCHERS</div>
        </div>
      </div>

      <ButtonState
        enabled={executable}
        mainText="RECRUIT"
        width={150}
        className="!p-2"
        onClick={hire}
      />
    </>
  );
};
