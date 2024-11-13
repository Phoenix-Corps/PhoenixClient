"use client";
import React, { ReactNode, use, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDashboardContext } from "@/context/DashboardContext";
type Props = {
  children: ReactNode;
};

const TeamWrapper: React.FC<Props> = ({ children }) => {
  const { pageType, userInfo, walletAddress, fetchUserInfo } =
    useDashboardContext();

  const [error, setError] = useState<string>("");
  const { isConnected } = useAccount();
  const [imageWidth, setImageWidth] = useState(1440);
  const [imageHeight, setImageHeight] = useState(2579);
  useEffect(() => {
    if (walletAddress) {
      fetchUserInfo(walletAddress).catch(e => {
        setError(e.message);
      });
    }
  }, [userInfo]);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (userInfo?.isTeamUser) {
      setImageWidth(860);
      setImageHeight(2579);
    } else {
      setImageWidth(1440);
      setImageHeight(3712);
    }
    // Function to calculate and set height based on screen dimensions
    const updateContainerHeight = () => {
      const screenWidth = window.innerWidth;
      const dynamicHeight = (imageHeight * screenWidth) / imageWidth;
      setContainerHeight(
        userInfo?.isTeamUser ? dynamicHeight : dynamicHeight * 1.06
      );
    };

    // Initial calculation on mount
    updateContainerHeight();

    // Update height on window resize
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, [userInfo?.isTeamUser]);

  const containerStyles = {
    height: `${containerHeight}px`,
    backgroundSize: "100% 100%"
  };

  return (
    <div
      className={`relative min-h-screen p-4 bg-center bg-no-repeat ${
        userInfo?.isTeamUser ? "army-background" : "solo-background"
      }`}
      style={containerStyles}
    >
      {error ? (
        <div className="text-center items-center flex flex-col justify-center h-screen">
          <p className="mb-4 text-white">{error}</p>
        </div>
      ) : (
        <>
          {!isConnected ? (
            <div className="text-center items-center flex flex-col justify-center h-screen">
              <p className="mb-4 text-white">Connect your wallet to continue</p>
              <div className="z-20">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </div>
  );
};

export default TeamWrapper;
