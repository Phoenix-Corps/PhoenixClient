import React, { useCallback, useEffect, useMemo, useState } from "react";
import ArrowIcon from "@public/dashboard/Vector 1.svg";
import { getHireRankInfo, HireRank, recruit } from "@/services/walletService";
import { useDashboardContext } from "@/context/DashboardContext";
import { useEthersProvider } from "@/services/useEthersProvider";
import { useEthersSigner } from "@/services/useEthersSigner";
import TransactionHandler from "@/app/buy/components/transactionHandler";
import { ethers } from "ethers";

type RecruitMenuProps = {
  onClose: () => void;
};

const RecruitMenu = ({ onClose }: RecruitMenuProps) => {
  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const { walletAddress, userInfo, fetchUserInfo } = useDashboardContext();

  const [ranks, setRanks] = useState<HireRank[]>([]);
  const [selectedRank, setSelectedRank] = useState<HireRank | null>(null);
  const [recruitAddress, setRecruitAddress] = useState<string>("");

  const [hireInProgress, setHireInProgress] = useState<boolean>(false);
  const [hireTx, setHireTx] = useState<Promise<any> | undefined>(undefined);

  const [dropdownOpen, setDropdownOpen] = useState(false);

    "Desired rank for new recruit"


  const getHireInfo = useCallback(async () => {
    if (userInfo && provider) {
      const loadedRanks = await getHireRankInfo(provider, userInfo.address, [0, 4, 9]);
      setRanks(loadedRanks);
    }
  }, [userInfo, setRanks]);

  useEffect(() => {
    if (walletAddress) {
      getHireInfo();
      fetchUserInfo(walletAddress);
    }
  }, [walletAddress]);

  const recruitAddressValid = useMemo(() => {
    return ethers.utils.isAddress(recruitAddress);
  }, [recruitAddress]);

  const canHire = useMemo(() => {
    if (hireInProgress) {
      return false
    }
    if (!recruitAddressValid) {
      return false;
    }
    if (!userInfo || !selectedRank) {
      return false;
    }
    return userInfo.canHire && userInfo.currentXP > selectedRank.hireCost;
  }, [hireInProgress, recruitAddressValid, userInfo, selectedRank]);

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSelectRank = (rankIndex: number) => {
    setSelectedRank(ranks[rankIndex]);
    setDropdownOpen(false);
  };

  const handleRecruitAddressChange = useCallback((e: any) => {
    setRecruitAddress(e.target.value);
  }, [setRecruitAddress]);

  const hire = useCallback(() => {
    if (selectedRank && signer) {
      setHireInProgress(true);
      const tx = recruit(recruitAddress, selectedRank?.id, signer);
      setHireTx(tx);
    }
  }, [setHireInProgress, setHireTx, recruitAddress, selectedRank, signer]);

  const onHireComplete = useCallback(() => {
    setHireInProgress(false);
    setHireTx(undefined);
  }, [setHireInProgress, setHireTx])

  return (
    <>
      <div
        className="table-gradient-container flex items-center justify-center mt-8 rounded-tl-[40px] md:rounded-tl-[60px] lg:rounded-tl-[80px] overflow-x-auto mx-auto"
        style={{ padding: 0, borderWidth: 0, maxWidth: "1030px" }}
      >
        <div className="w-1/3 p-4 text-center">
          <div className="text-4xl font-bold text-gray-800">{userInfo?.currentXP.toFixed(2).toString() ?? "N/A"}</div>
          <div className="text-gray-600 mb-8">Spendable XP</div>
          <div className="text-4xl font-bold text-gray-800">{selectedRank?.hireCost.toString() ?? "N/A"}</div>
          <div className="text-gray-600 mb-8">Required XP</div>
          <div className="text-4xl font-bold text-gray-800">{selectedRank?.vouchers ?? "N/A"}</div>
          <div className="text-gray-600">Vouchers</div>
        </div>

        <div className="w-2/3 bg-gradient-to-r from-[#1F354F] to-[#28425D] p-6 flex flex-col items-center">
          <div
            className="space-y-4 flex flex-col items-center"
            style={{ width: "100%" }}
          >
            <div
              className="p-3 bg-[#3F5269] text-white cursor-pointer outline outline-white outline-1 outline-offset-1 rounded-tl-lg rounded-tr-lg flex justify-between items-center"
              style={{
                maxWidth: "500px",
                width: "100%",
                borderBottomLeftRadius: dropdownOpen ? 0 : "0.5rem",
                borderBottomRightRadius: dropdownOpen ? 0 : "0.5rem",
                marginBottom: dropdownOpen ? 0 : undefined
              }}
              onClick={handleDropdownToggle}
            >
              <div>{selectedRank?.name}</div>
              <ArrowIcon
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""
                  }`}
                style={{ marginLeft: "auto" }}
              />
            </div>

            {dropdownOpen && (
              <div
                className="bg-[#1F354F] rounded-bl-lg rounded-br-lg shadow-lg outline outline-white outline-1 outline-offset-1"
                style={{
                  maxWidth: "500px",
                  width: "100%",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  marginTop: 0
                }}
              >
                {ranks.map((rank, index) => {
                  return <div
                    className="p-3 text-white hover:bg-[#3F5269] cursor-pointer flex justify-center items-center"
                    onClick={() => handleSelectRank(index)}
                  >
                    {rank.name}
                  </div>
                })}
              </div>
            )}

            <input
              onChange={handleRecruitAddressChange}
              type="text"
              placeholder="New recruit's wallet address"
              className="p-3 rounded-lg bg-[#3F5269] text-white focus:outline-none outline outline-white outline-1 outline-offset-1"
              style={{ maxWidth: "500px", width: "100%" }}
            />
          </div>

          <button
            className="button button-yellow w-full mt-4"
            disabled={!canHire}
            style={{ maxWidth: "500px", width: "100%" }}
            onClick={hire}
          >
            RECRUIT
          </button>
        </div>
      </div>
      <TransactionHandler txPromise={hireTx} loadingMessage="Hiring in progress..." successMessage="Hire successful!" onTxDone={onHireComplete} />
    </>
  );
};

export default RecruitMenu;
