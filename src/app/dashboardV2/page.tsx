"use client";

import Image from "next/image";

import Decimal from "decimal.js";

import { useDashboardContext } from "@/components/context/DashboardContext";
import { useTransactionHandler } from "@/components/context/TransactionHandlerContext";

import { ButtonState } from "@/components/Buttons/ButtonState";
import { XpBar } from "@/components/pages/dashboardV2/XpBar";
import { CopyField } from "@/components/Inputs/CopyField";

import { formatAddress } from "@/utils/format";

import { useEthersSigner } from "@/services/useEthersSigner";
import { upgradeRank } from "@/services/walletService";

import Icon_Profile from "@public/icons/profile.svg";

import "./page.css";

const RankBadge = (props: { rank: number; team: boolean }) => {
  return (
    <div className="badge-rank flex items-center pl-2 pr-2">
      <div className="flex items-end">
        <div className="text-base pr-1">LVL. </div>
        <div className="text-lg pr-1">{props.rank}</div>
      </div>
      <Image
        src={`/images/ranks/${props.team ? "team" : "solo"}/Lvl-${
          props.rank
        }.png`}
        alt="Rank"
        width={32}
        height={32}
      />
    </div>
  );
};

const RankXpInfo = (props: {
  rank: number;
  team: boolean;
  currentXP: Decimal;
  maxXP?: Decimal;
}) => {
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex w-full justify-between">
        <RankBadge rank={props.rank} team={props.team} />
        <div>
          <div className="flex items-end">
            <div className="text-4xl pr-1">{props.currentXP.toFixed(0)}</div>
            <div className="text-2xl">
              / {props.maxXP?.toFixed(0) ?? 0} XP EARNED
            </div>
          </div>
        </div>
      </div>
      <XpBar current={props.currentXP} max={props.maxXP} />
    </div>
  );
};

const ProfileInfo = (props: { walletAddress: string; rankName?: string }) => {
  return (
    <div className="flex gap-5">
      <div className="profile-badge flex items-center justify-center">
        <Icon_Profile />
      </div>

      <div className="flex flex-col">
        <div className="text-3xl uppercase">{props.rankName}</div>
        <CopyField
          value={formatAddress(props.walletAddress)}
          className="aeroport text-xs stroke_textAccent items-start"
        />
      </div>
    </div>
  );
};

export default function Page() {
  const signer = useEthersSigner();
  const { walletAddress, userInfo } = useDashboardContext();
  const { setTx } = useTransactionHandler();

  const upgradeLevel = () => {
    if (
      signer &&
      (userInfo?.nextRank?.requiredXP?.comparedTo(userInfo?.currentXP!) ?? 1) <=
        0
    ) {
      setTx(
        "Upgrading rank",
        "Successfully upgrated rank",
        upgradeRank(signer)
      );
    }
  };

  return (
    <div className="card-container din color_textAccent">
      <div className="card">
        <div className="flex justify-between pb-5">
          <ProfileInfo
            walletAddress={walletAddress!}
            rankName={userInfo?.currentRank.name}
          />
          <ButtonState
            enabled={
              (userInfo?.nextRank?.requiredXP?.comparedTo(
                userInfo?.currentXP!
              ) ?? 1) <= 0
            }
            mainText="UPGRADE"
            width={200}
            className="!p-2"
            onClick={upgradeLevel}
          />
        </div>

        <RankXpInfo
          rank={userInfo?.currentRank?.level ?? 0}
          team={!!userInfo?.isTeamUser}
          currentXP={userInfo?.currentXP!}
          maxXP={userInfo?.nextRank?.requiredXP}
        />

        <div className="aeroport flex items-end justify-between pt-3">
          <div className="text-base font-normal">Your current commission:</div>
          <div className="text-xl px-1">
            {userInfo?.currentRank.paymentPercent.toFixed(0)}%
          </div>
        </div>
      </div>
      <div className="card flex flex-col items-center">
        <div className="text-center">My code</div>
        <CopyField
          value={userInfo?.referralCode!}
          className="referral-box text-4xl text-center stroke_textAccent"
        />
      </div>
    </div>
  );
}
