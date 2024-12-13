"use client";

import { ReactNode, useCallback, useEffect } from "react";

import { useAccount } from "wagmi";

import { registerUser } from "@/services/walletService";

import { Header } from "@/components/Header";
import { ButtonConnect } from "@/components/Buttons/ButtonConnect";
import { LoadingOverlay } from "@/components/LoadingOverlay";

import { useEthersSigner } from "@/services/useEthersSigner";
import { useDashboardContext } from "@/components/context/DashboardContext";

import "./layout.css";
import { ButtonYellow } from "@/components/Buttons/ButtonYellow";

type Props = {
  children: ReactNode;
};

const TeamWrapper: React.FC<Props> = ({ children }) => {
  const { userInfo } = useDashboardContext();
  const { isConnected } = useAccount();

  return (
    <div
      className={`relative min-h-screen p-4 bg-center bg-no-repeat bg-${
        userInfo?.isTeamUser ? "team" : "solo"
      }`}
    >
      <>
        {!isConnected ? (
          <div className="main-air-wrapper text-center items-center flex flex-col justify-center h-screen">
            <p className="mb-4 text-white">Connect your wallet to continue</p>
            <div className="z-20">
              <ButtonConnect />
            </div>
          </div>
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
