"use client";

import { ReactNode, useCallback, useEffect, useMemo } from "react";

import { useAccount } from "wagmi";

import { registerUser } from "@/services/walletService";

import { Header } from "@/components/Header";
import { ButtonConnect } from "@/components/Buttons/ButtonConnect";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ButtonYellow } from "@/components/Buttons/ButtonYellow";

import { useEthersSigner } from "@/services/useEthersSigner";
import { useDashboardContext } from "@/components/context/DashboardContext";

import "./layout.css";

type Props = {
  children: ReactNode;
};

const TeamWrapper: React.FC<Props> = ({ children }) => {
  const { userInfo, walletAddress, fetchUserInfo } = useDashboardContext();
  const { isConnected } = useAccount();

  const bg = useMemo(() => {
    if (!isConnected) return "main-air-wrapper";
    if (userInfo?.isTeamUser) return "bg-team";
    else return "bg-solo";
  }, [userInfo?.isTeamUser, isConnected]);

  useEffect(() => {
    if (walletAddress) fetchUserInfo(walletAddress);
  }, [walletAddress, isConnected]);

  return (
    <div className={`relative min-h-screen p-4 bg-center bg-no-repeat ${bg}`}>
      <>
        {!isConnected ? (
          <>
            <Header />
            <div className="card flex flex-col items-center justify-center m-auto mt-4 w-[300px]">
              <p className="din color_textAccent text-3xl text-center">
                Connect your wallet to continue
              </p>
              <ButtonConnect />
            </div>
          </>
        ) : (
          <>{children}</>
        )}
      </>
    </div>
  );
};

const LoadedAndRegisteredWrapper: React.FC<Props> = ({ children }) => {
  const signer = useEthersSigner();
  const {
    userInfo,
    loadingDashboard,
    walletAddress,
    resetUserInfo,
    fetchUserInfo
  } = useDashboardContext();

  useEffect(() => {
    if (walletAddress) fetchUserInfo(walletAddress);
  }, [walletAddress]);

  const register = useCallback(async () => {
    if (signer)
      registerUser(signer).then(() => resetUserInfo(walletAddress as string));
  }, [signer, walletAddress]);

  return (
    <>
      {loadingDashboard ? (
        <LoadingOverlay isLoading={loadingDashboard} />
      ) : (
        <>
          {!userInfo?.referralCode ? (
            <div className="flex items-center justify-center m-auto mt-4">
              <ButtonYellow mainText="Register" onClick={register} />
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  );
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TeamWrapper>
      <Header />
      <LoadedAndRegisteredWrapper>{children}</LoadedAndRegisteredWrapper>
    </TeamWrapper>
  );
}
