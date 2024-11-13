import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react";
import {
  getUserInfo,
  UserInfo,
  getUserClaimInfo,
  ClaimInfo
} from "@/services/walletService";

import { useEthersProvider } from "@/services/useEthersProvider";
import { useAccount } from "wagmi";

export interface DashboardContextType {
  userInfo: UserInfo | null;
  pageType: "solo" | "army";
  claimInfo: ClaimInfo[];
  walletAddress: string | undefined;
  fetchUserInfo: (address: string) => Promise<UserInfo | null>;
  fetchClaimInfo: (address: string) => Promise<ClaimInfo[] | []>;
  changePageType: () => void;
  loadingDashboard: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const provider = useEthersProvider();
  const { address } = useAccount();
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [claimInfo, setClaimInfo] = useState<ClaimInfo[] | []>([]);
  const [pageType, setPageType] = useState<"solo" | "army">("solo");

  const changePageType = useCallback(() => {
    if (pageType === "solo") {
      setPageType("army");
    } else {
      setPageType("solo");
    }
  }, [pageType]);

  const fetchClaimInfo = useCallback(
    async (address: string): Promise<ClaimInfo[] | []> => {
      if (!provider) {
        console.error("Provider is not available");
        return [];
      }

      if (claimInfo.length > 0) {
        console.log("FROM CACHE", claimInfo);
        return claimInfo;
      }

      try {
        const data = await getUserClaimInfo(provider, address);
        console.log("NOT FROM CACHE", claimInfo);
        console.log("CLAIM INFO", data);
        setClaimInfo(data);
        return data;
      } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
      } finally {
        setLoadingDashboard(false);
      }
    },
    [provider, claimInfo]
  );

  const fetchUserInfo = useCallback(
    async (address: string): Promise<UserInfo | null> => {
      if (!provider) {
        console.error("Provider is not available");
        return null;
      }

      if (userInfo) {
        console.log("userinfo from cache");
        console.log(userInfo);
        return userInfo;
      }

      setLoadingDashboard(true);

      try {
        const data = await getUserInfo(provider, address);
        console.log("NOT FROM CACHE", userInfo);
        setUserInfo(data);
        return data;
      } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
      } finally {
        setLoadingDashboard(false);
      }
    },
    [provider, userInfo]
  );
  return (
    <DashboardContext.Provider
      value={{
        walletAddress: address,
        claimInfo,
        loadingDashboard,
        userInfo,
        pageType,
        changePageType,
        fetchUserInfo,
        fetchClaimInfo
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardProvider must be used within a DashboardProvider"
    );
  }
  return context;
};
