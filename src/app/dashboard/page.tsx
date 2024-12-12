"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { formatAddress } from "@/utils/format";
import { useEthersSigner } from "@/services/useEthersSigner";
import { useDashboardContext } from "@/components/context/DashboardContext";

import { XpEarned } from "../../components/pages/dashboard/profile/XpEarned";
import COPY_ICON from "@/app/dashboard/public/copy-icon.svg";
import LoadingOverlay from "../buy/components/loadingOverlay";
import { registerUser } from "@/services/walletService";
import TransactionHandler from "../buy/components/transactionHandler";

const Home: NextPage = () => {
  const {
    walletAddress,
    userInfo,
    fetchUserInfo,
    loadingDashboard,
    resetUserInfo
  } = useDashboardContext();

  const signer = useEthersSigner();

  const [infoError, setInfoError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [registerPromise, setRegisterPromise] = useState<any>(null);

  useEffect(() => {
    console.log("Wallet Address");
    if (walletAddress) {
      fetchUserInfo(walletAddress).catch(error => {
        setInfoError("Error fetching user info");
      });
    }
  }, []);

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

  const register = useCallback(async () => {
    if (signer) {
      const promise = registerUser(signer);
      setRegisterPromise(promise);
    }
  }, [signer, setRegisterPromise]);

  const registerDone = useCallback(
    (success: boolean) => {
      if (success && walletAddress) {
        resetUserInfo(walletAddress);
      }
    },
    [walletAddress]
  );
  return (
    <>
      <Head>
        <title>My Profile - Shinobi Alliance</title>
      </Head>
      <div className="mt-28 md:mt-20 lg:mt-36 px-4 md:px-24">
        {loadingDashboard ? (
          <LoadingOverlay isLoading={loadingDashboard} />
        ) : infoError ? (
          <h1 className="shadow-text text-red-500 text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
            {infoError}
          </h1>
        ) : (
          <>
            <h1 className="shadow-text text-white text-center text-3xl md:text-5xl lg:text-[54px] font-bold font-noto-serif uppercase">
              My profile
            </h1>

            <div className="mx-auto mt-6 md:mt-9 lg:mt-12">
              {/* Profile Card */}
              {userInfo?.referralCode ? (
                <div className="profile-info-xp">
                  <div className="profile-card py-4 h-[170px] lg:h-[251px] flex justify-between items-center px-6 rounded-tl-[50px] lg:rounded-tl-[80px] shadow-xl lg:px-[56px]">
                    <div className="flex flex-col gap-1.5">
                      <div>
                        <h3 className="text-[#12384F] header-text-bold text-[32px] font-bold font-source-sans-pro leading-[50px]">
                          Lvl. {userInfo?.currentRank.level}
                        </h3>
                        <div className="flex gap-10 items-center">
                          <h2 className="shadow-text2 text-[#12384F] header-text-bold text-4xl lg:text-[54px] font-bold font-noto-serif uppercase">
                            {userInfo?.currentRank.name}
                          </h2>
                        </div>
                      </div>
                      <p className="text-[#09111B] text-[14px] lg:text-[22px] font-source-sans-pro">
                        You are currently earning{" "}
                        <span className="font-bold">
                          {userInfo?.currentRank.paymentPercent ?? 0}%
                        </span>{" "}
                        in commissions
                      </p>
                    </div>
                    {userInfo?.currentRank?.level ? (
                      <div className=" md:block">
                        <Image
                          src={
                            userInfo.isTeamUser
                              ? `/images/ranks/team/Lvl-${
                                  userInfo && userInfo?.currentRank?.level
                                }.png`
                              : `/images/ranks/solo/Lvl-${
                                  userInfo && userInfo?.currentRank?.level
                                }.png`
                          }
                          width={100}
                          height={100}
                          alt=""
                          className="md:block max-h-[140px] object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                  {/* Edit Profile */}
                  <XpEarned />
                </div>
              ) : null}
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
                        {walletAddress && formatAddress(walletAddress)}
                      </h2>
                      <div className="relative flex items-center">
                        <button
                          onClick={() =>
                            handleCopyReferralCode(walletAddress as string)
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
                  {userInfo?.referralCode ? (
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-[#0d283a] text-3xl lg:text-[42px] font-bold font-noto-serif leading-[50px] shadow-text2 truncate">
                        {userInfo?.referralCode}
                      </h2>
                      <div className="relative flex items-center">
                        <button
                          onClick={() => handleCopyCode(userInfo.referralCode)}
                        >
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
                  ) : (
                    <button
                      className="flex items-center justify-center m-auto mt-4
          rounded-full text-sm p-2 lg:text-[18px] md:h-[45px] w-[189px]
          uppercase font-bold
          transition-colors duration-500 ease-in-out upgrade-button "
                      onClick={register}
                    >
                      {" "}
                      Register User
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <TransactionHandler
          loadingMessage={"Registering user"}
          successMessage={"Successfully registered user"}
          txPromise={registerPromise}
          onTxDone={registerDone}
        />
      </div>
    </>
  );
};

export default Home;
