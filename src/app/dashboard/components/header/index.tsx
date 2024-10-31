"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import phoenixLogo from "@/app/dashboard/public/images/phoenix-logo.png";
import GRADIENT_LINE from "@/app/dashboard/public/my-profile/Line 1.png";
import HeaderLogo from "@/app/dashboard/public/images/headerLogo.png";
import { useDisconnect, useAccount } from "wagmi";

import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const [isCollapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(false);
  }, [pathname]);
  const disconnectWallet = async () => {
    try {
      await disconnect();
      setCollapsed(false);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };
  return (
    <header
      className={
        isCollapsed
          ? `header fixed top-0 z-10 transition-all px-4 md:px-20 w-full flex flex-col items-start pt-[30px] overflow-y-auto py-6 rounded-bl-[100px] shadow-2xl`
          : `w-full absolute top-0 z-10 px-4 md:px-20 h-[110px] lg:h-[165px] flex flex-col items-center pt-[30px] overflow-hidden py-6`
      }
    >
      <div className="flex w-full justify-between cursor-pointer bg-white/0">
        <Link href={"https://phoenixcorps.io"}>
          <Image
            src={phoenixLogo}
            alt=""
            className="max-h-[75px] md:max-h-[100px] lg:max-h-[140px] object-contain w-fit"
          />
        </Link>
        <div className="flex items-center gap-4 relative">
          {isConnected ? (
            <button
              className="bg-[#182C4521] text-white text-sm lg:text-base font-bold font-noto-serif border e rounded-full px-4 py-2 transition-all"
              onClick={() => setCollapsed(!isCollapsed)}
            >
              {!isCollapsed ? "Menu" : "X"}
            </button>
          ) : null}

          <Image
            src={HeaderLogo}
            alt=""
            className="max-h-[75px] md:max-h-[100px] lg:max-h-[140px] object-contain w-fit"
          />
        </div>
      </div>

      <ul
        className={`w-full bottom-[-100%] flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-10 justify-center items-center`}
      >
        <li onClick={() => setCollapsed(false)}>
          <Link
            href={"/dashboard"}
            className="shadow-text text-white text-lg md:text-2xl lg:text-[36px] font-noto-serif uppercase cursor-pointer"
          >
            My Profile
          </Link>
        </li>

        <li onClick={() => setCollapsed(false)}>
          <Link
            href={"/dashboard/claims"}
            className="shadow-text text-white text-lg md:text-2xl lg:text-[36px] font-noto-serif uppercase cursor-pointer"
          >
            My Claims
          </Link>
        </li>
        <li
          onClick={disconnectWallet}
          className="shadow-text text-white text-lg md:text-2xl lg:text-[36px] font-noto-serif uppercase cursor-pointer"
        >
          Disconnect wallet
        </li>
      </ul>

      <div className="flex justify-center items-center mx-auto mt-12 gap-x-4 mb-8"></div>
      <div className="mx-auto my-4">
        <Image src={GRADIENT_LINE} alt="" className="object-contain" />
      </div>
    </header>
  );
};

export default Header;
