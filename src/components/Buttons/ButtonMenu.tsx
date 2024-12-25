"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useAccount } from "wagmi";

import { useDashboardContext } from "../context/DashboardContext";

import { Header } from "@/components/Page/Header";

import Icon_Menu from "@public/icons/menu.svg";
import Icon_Close from "@public/icons/close-x.svg";

type Props = {
  onClick?: () => void;
};

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
        href={`/dashboard${link}`}
        className="menuItem shadow-text text-white uppercase cursor-pointer p-3 rounded-full"
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

  const handleOpen = () => {
    if (!!props.onClick) props.onClick?.();
    else setShowMenu(true);
  };

  return (
    <>
      {isConnected && (
        <>
          <button
            onClick={handleOpen}
            className={`menu-button w-[60px] h-[40px] text-xs p-1 flex items-center justify-center fill_textAccent`}
          >
            <Icon_Menu />
          </button>

          {showMenu && (
            <div className="menuBlurred w-full h-full fixed top-0 left-0 z-10 ">
              <Header onMenuClick={() => setShowMenu(false)} />
              <ul
                className={`w-full flex flex-col gap-10 justify-center items-center pt-10 text-5xl aeroport`}
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
