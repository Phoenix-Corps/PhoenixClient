// Home.tsx

"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PhoenixLOGO from "@/app/dashboard/public/my-profile/Phoenix logo.png";
import ShinobiLogo from "@/app/dashboard/public/images/headerLogo.png";
import VECTOR_1 from "@/app/dashboard/public/my-profile/Vector 1.svg";
import COPY_ICON from "@/app/dashboard/public/copy-icon.svg";
import Head from "next/head";
import { formatAddress } from "@/app/dashboard/utils/formatAddress";
import { useAccount } from "wagmi";
import PFP from "./public/my-profile/PFP.png";
import { useState } from "react";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyReferralCode = (textForCopy: string) => {
    if (textForCopy) {
      navigator.clipboard
        .writeText(textForCopy as string)
        .then(() => {
          setSuccessMessage("Referral code copied to clipboard!");
          setIsCopied(true);
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
          setErrorMessage("Failed to copy referral code.");
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {!isConnected ? (
        <div className="text-center items-center flex flex-col justify-center">
          <p className="mb-4  text-white">Connect your wallet to continue</p>
          <ConnectButton />
        </div>
      ) : (
        <>
          <Head>
            <title>My Profile - Shinobi Alliance</title>
          </Head>

          {/* body */}
          <div className="mt-10 md:mt-20 lg:mt-36 px-4 md:px-24">
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
              <div className="profile-card-black bg-dark-card-grad pb-5 rounded-b-[40px] md:rounded-b-[60px] h-fit lg:rounded-b-[80px] shadow-xl px-[56px] mt-24 md:mt-32 lg:mt-36 font-noto-serif relative">
                <div className="absolute flex -top-16 left-1/2 transform -translate-x-1/2 w-full h-[96px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px]">
                  <div className="divider lg:hidden block " />
                  <Image
                    src={PFP}
                    alt=""
                    width={140}
                    height={140}
                    className="rounded-full object-contain"
                  />
                  <div className="divider rotate-180 lg:hidden block" />
                </div>
                <div className="pt-8 md:pt-24 lg:pt-32">
                  <div className="lg:flex">
                    <div className="divider hidden lg:block " />
                    <h1 className="shadow-text text-white text-center text-[28px] md:text-[36px] lg:text-[42px] font-bold font-noto-serif uppercase">
                      Rezene Idris
                    </h1>

                    <div className="divider lg:rotate-180 hidden lg:block" />
                  </div>
                  <div className="flex flex-col gap-5 justify-center items-center pt-4">
                    <button className="yellow-button flex items-center gap-1 justify-center text-[#182C45] rounded-full text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px] border-[4px] border-[#F2E63D] uppercase font-bold">
                      xp earned <VECTOR_1 alt="Vector Icon" />
                    </button>
                    <button
                      // onClick={toggleEditModal}
                      className="flex items-center justify-center bg-[#182C4566] text-white rounded-full text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px] border border-white uppercase font-bold"
                    >
                      edit profile
                    </button>
                  </div>
                </div>
              </div>
              {/* Numbers */}
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div className="profile-card  w-full py-7 lg:h-[206px] flex flex-col lg:flex-row lg:justify-between gap-y-4 items-center justify-center rounded-tl-[40px] lg:rounded-tl-[80px] shadow-xl mt-8 md:mt-16 lg:mt-24 px-[56px]">
                  <div className="flex flex-col items-center gap-x-3 md:flex-row">
                    <h1 className="shadow-text2 font-bold  text-[#0d283a] text-3xl md:text-4xl lg:text-[54px] font-noto-serif uppercase leading-10 lg:leading-[60px]">
                      32
                    </h1>
                    <p className="text-[#09111B] text-xl lg:text-[22px] font-source-sans-pro">
                      Projects
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-x-3 md:flex-row ">
                    <h1 className="shadow-text2 font-bold text-[#0d283a] text-3xl md:text-4xl lg:text-[54px] font-noto-serif uppercase leading-10 lg:leading-[60px]">
                      $3,540
                    </h1>
                    <p className="text-[#09111B] text-xl lg:text-[22px] font-source-sans-pro">
                      Total sale
                    </p>
                  </div>
                  <div className="flex flex-col  items-center gap-x-3 md:flex-row">
                    <h1 className="shadow-text2 font-bold text-[rgb(13,40,58)] text-3xl md:text-4xl lg:text-[54px] font-noto-serif uppercase leading-10 lg:leading-[60px]">
                      $10,972
                    </h1>
                    <p className="text-[#09111B] text-xl lg:text-[22px] font-source-sans-pro">
                      My earnings
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile info */}
              <div className="lg:max-w-[609px] mx-auto profile-card rounded-tl-[40px] lg:rounded-tl-[80px] shadow-xl mt-8 md:mt-16 lg:mt-24 p-4 lg:py-12">
                <h1 className="shadow-text text-white text-center text-3xl lg:text-[42px] font-bold font-noto-serif uppercase leading-[60px]">
                  Profile info
                </h1>

                <div className="flex justify-center py-3">
                  {/* <Image src={PROFILE_INFO_LINE} alt="" /> */}
                </div>
                <div className="max-w-[377px] mx-auto">
                  <div>
                    <p className="text-[#09111B] text-center lg:text-left text-lg lg:text-[22px] font-source-sans-pro">
                      Date of recruitment
                    </p>
                    <h2 className="text-[#0d283a] text-center lg:text-left text-3xl lg:text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2">
                      05.10.2024
                    </h2>
                  </div>
                  <div className="mt-2 lg:mt-5">
                    <p className="text-[#09111B] text-center lg:text-left text-lg lg:text-[22px] font-source-sans-pro">
                      Wallet address
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <h2 className="text-[#0d283a] text-center lg:text-left text-3xl lg:text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2 truncate">
                        {formatAddress(
                          address ||
                            "0x0000000000000000000000000000000000000000"
                        )}
                      </h2>
                      <button
                        onClick={() =>
                          handleCopyReferralCode(address as string)
                        }
                      >
                        <COPY_ICON />
                      </button>
                      {isCopied && (
                        <p
                          className="added-fade-out"
                          onAnimationEnd={() => setIsCopied(false)}
                        >
                          Copied!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 lg:mt-5">
                    <p className="text-[#09111B] text-center lg:text-left text-lg lg:text-[22px] font-source-sans-pro">
                      Email address
                    </p>
                    <h2 className="text-[#0d283a] text-center lg:text-left text-3xl lg:text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2">
                      has@domain.com
                    </h2>
                  </div>
                </div>
              </div>

              {/* Referral Code Section */}
              <div className="lg:max-w-[609px] mx-auto transparent-bg h-auto min-h-[200px] flex flex-col gap-4 justify-center items-center rounded-tl-[40px] lg:rounded-tl-[80px] shadow-2xl mt-8 md:mt-16 lg:mt-24 p-6">
                <p className="text-[#09111B] text-[22px] font-source-sans-pro">
                  My code
                </p>
                <div className="flex items-center gap-2">
                  <>
                    <h2 className="text-[#0d283a] text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2 uppercase">
                      XXXXXX
                    </h2>
                    <button onClick={() => handleCopyReferralCode("XXXXXX")}>
                      <COPY_ICON />
                    </button>
                  </>
                </div>
                {/* {successMessage && (
                  <div
                    className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Success: </strong>
                    <span className="block sm:inline">{successMessage}</span>
                  </div>
                )} */}
              </div>
              <div className="lg:max-w-[609px] mx-auto transparent-bg rounded-tl-[40px] lg:rounded-tl-[80px] shadow-2xl mt-8 md:mt-16 lg:mt-24 p-8 md:p-12 lg:p-[56px]">
                <h2 className="text-[#09111B] text-[28px] font-medium font-noto-serif leading-[50px] shadow-text2 uppercase">
                  Bio
                </h2>
                <p className="text-[#09111B] text-lg lg:text-[22px] font-source-sans-pro">
                  Lorem ipsum dolor sit amet consectetur. Lacus nec tristique
                  imperdiet nisl consequat. Ornare commodo massa fermentum
                  porttitor ac nibh porttitor lacus.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      ;{isConnected && <ConnectButton />}
    </div>
  );
};

export default Home;
