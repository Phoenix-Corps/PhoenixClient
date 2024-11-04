// Home.tsx

"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PhoenixLOGO from "@/app/dashboard/public/my-profile/Phoenix logo.png";
import ShinobiLogo from "@/app/dashboard/public/images/headerLogo.png";
import COPY_ICON from "@/app/dashboard/public/copy-icon.svg";
import Head from "next/head";
import { formatAddress } from "@/app/dashboard/utils/formatAddress";
import { useAccount } from "wagmi";
import PFP from "./public/my-profile/PFP.png";
import { useEffect, useState } from "react";
import { useEthersProvider } from "@/services/useEthersProvider";
import { getUserInfo } from "@/services/walletService";
import { providers } from "ethers";
import XPearned from "./components/xpEarned"

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const myCode = "XXXXXX";

  const [isCopied, setIsCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const handleCopyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCodeCopied(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {!isConnected ? (
        <div className="text-center items-center flex flex-col justify-center">
          <p className="mb-4  text-white">Connect your wallet to continue</p>
          <div className="z-20">
            <ConnectButton />
          </div>
        </div>
      ) : (
        <>
          <Head>
            <title>My Profile - Shinobi Alliance</title>
          </Head>

          {/* body */}
          <div className="mt-28 md:mt-20 lg:mt-36 px-4 md:px-24">
            <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
              My profile
            </h1>
            <div className="mx-auto mt-6 md:mt-9 lg:mt-12">
              {/* Profile Card */}
              <div className="profile-card py-4 h-[170px] lg:h-[251px] flex justify-between items-center px-6 rounded-tl-[50px] lg:rounded-tl-[80px] shadow-xl lg:px-[56px]">
                {/* <div className="hidden md:block">
                  <Image src={PhoenixLOGO} alt="" className="max-h-[140px]" />
                </div> */}
                <div className="flex flex-col gap-1.5">
                  <div>
                    <h3 className="text-[#12384F] header-text-bold text-[32px] font-bold font-source-sans-pro leading-[50px]">
                      Lvl. 1
                    </h3>
                    <div className="flex gap-10 items-center">
                      <h2 className="shadow-text2 text-[#12384F] header-text-bold text-4xl lg:text-[54px] font-bold font-noto-serif uppercase">
                        Shinobi
                      </h2>
                    </div>
                  </div>
                  <p className="text-[#09111B] text-[14px] lg:text-[22px] font-source-sans-pro">
                    You are currently earning{" "}
                    <span className="font-bold">3.5%</span> in commissions
                  </p>
                </div>
                <div className=" md:block">
                  <Image
                    src={ShinobiLogo}
                    alt=""
                    className="md:block max-h-[140px] object-contain"
                  />
                </div>
              </div>
              {/* Edit Profile */}
              <XPearned />
              {/* Numbers */}

              {/* Profile info */}
              <div className="lg:max-w-[609px] mx-auto profile-card rounded-tl-[40px] lg:rounded-tl-[80px] shadow-xl mt-8 md:mt-16 lg:mt-24 p-4 lg:py-12">
                <h1 className="shadow-text text-white text-center text-3xl lg:text-[42px] font-bold font-noto-serif uppercase leading-[60px]">
                  Profile info
                </h1>

                <div className="flex justify-center py-3">
                  {/* <Image src={PROFILE_INFO_LINE} alt="" /> */}
                </div>
                <div className="max-w-[377px] mx-auto flex flex-col">
                  <div className="mt-2 lg:mt-5">
                    <p className="text-[#09111B] text-center text-lg lg:text-[22px] font-source-sans-pro">
                      Wallet address
                    </p>

                    <div className="flex justify-center gap-1">
                      <h2 className="text-[#0d283a] text-3xl lg:text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2 truncate">
                        {formatAddress(
                          address ||
                            "0x0000000000000000000000000000000000000000"
                        )}
                      </h2>
                      <div className="relative flex items-center">
                        <button
                          onClick={() =>
                            handleCopyReferralCode(address as string)
                          }
                        >
                          <COPY_ICON />
                        </button>
                        {isCopied && (
                          <p
                            // className="flex added-fade-out absolute right-0 top-0"
                            className="flex added-fade-out absolute -left-3 -top-4"
                            onAnimationEnd={() => setIsCopied(false)}
                          >
                            Copied!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="flex justify-center gap-1">My code</p>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-[#0d283a] text-3xl lg:text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2 truncate">
                      {myCode}
                    </h2>
                    <div className="relative flex items-center">
                      <button onClick={() => handleCopyCode(myCode)}>
                        <COPY_ICON />
                      </button>
                      {isCodeCopied && (
                        <p
                          className="flex added-fade-out absolute -left-3 -top-6"
                          onAnimationEnd={() => setIsCodeCopied(false)}
                        >
                          Copied!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
