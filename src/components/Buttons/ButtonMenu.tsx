"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useAccount } from "wagmi";

import { useDashboardContext } from "../context/DashboardContext";

type Props = {};

const MenuItem = ({
  text,
  link,
  onClick
}: {
  text: string;
  link: string;
  onClick: () => void;
}) => {
  return (
    <li onClick={onClick}>
      <Link
        href={`/dashboardV2${link}`}
        className="shadow-text text-white text-lg md:text-2xl lg:text-[36px] font-noto-serif uppercase cursor-pointer"
      >
        {text}
      </Link>
    </li>
  );
};

export const ButtonMenu: React.FC<Props> = (props: Props) => {
  const pathname = usePathname();
  const { userInfo } = useDashboardContext();
  const { isConnected } = useAccount();

  const [showMenu, setShowMenu] = useState(false);
  const isTeamUser = useMemo(() => userInfo?.isTeamUser ?? false, [userInfo]);

  useEffect(() => setShowMenu(false), [pathname]);

  return (
    <>
      {isConnected && (
        <>
          <button
            onClick={() => setShowMenu(false)}
            className={`walletConnect-button w-[100px] h-[40px] text-xs p-1`}
          >
            Menu
          </button>

          {showMenu && (
            <div className="w-full absolute top-0 z-10 px-4">
              <ul
                className={`w-full flex flex-col gap-y-4 justify-center items-center`}
              >
                <MenuItem
                  text="My Profile"
                  link=""
                  onClick={() => setShowMenu(false)}
                />
                <MenuItem
                  text="My Claims"
                  link="/claims"
                  onClick={() => setShowMenu(false)}
                />
                {isTeamUser && (
                  <MenuItem
                    text="My Division"
                    link="/division"
                    onClick={() => setShowMenu(false)}
                  />
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};
