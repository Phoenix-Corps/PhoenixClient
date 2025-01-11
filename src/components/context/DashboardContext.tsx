import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react";

import { useAccount } from "wagmi";

import {
  getUserInfo,
  getUserClaimInfo,
  getHireRankInfo
} from "@/services/walletService";
import { useEthersProvider } from "@/services/useEthersProvider";

import { UserInfo, ClaimInfo } from "@/types/types";

export interface DashboardContextType {
  userInfo: UserInfo | null;
  claimInfo: ClaimInfo[] | null;
  walletAddress: string | undefined;
  fetchUserInfo: (address: string) => Promise<UserInfo | null>;
  resetUserInfo: (address: string) => Promise<UserInfo | null>;
  disconnectUserInfo: () => void;
  fetchClaimInfo: (address: string) => Promise<ClaimInfo[] | null>;
  resetClaimInfo: (address: string) => Promise<ClaimInfo[] | null>;
  loadingDashboard: boolean;
  loadingClaimInfo: boolean;
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
  const [loadingClaimInfo, setLoadingClaimInfo] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [claimInfo, setClaimInfo] = useState<ClaimInfo[] | null>(null);

  const fetchClaimInfo = useCallback(
    async (address: string): Promise<ClaimInfo[] | []> => {
      if (claimInfo) {
        console.log("FROM CACHE", claimInfo);
        return claimInfo;
      }

      return resetClaimInfo(address);
    },
    [provider, claimInfo]
  );

  const resetClaimInfo = useCallback(
    async (address: string) => {
      if (!provider) {
        console.error("Provider is not available");
        return [];
      }
      setLoadingClaimInfo(true);
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
        setLoadingClaimInfo(false);
      }
    },
    [provider]
  );

  const disconnectUserInfo = useCallback((): void => {
    setUserInfo(null);
  }, [provider]);

  const fetchUserInfo = useCallback(
    async (address: string): Promise<UserInfo | null> => {
      if (userInfo && userInfo?.address === address) {
        console.log("userinfo from cache");
        console.log(userInfo);
        return userInfo;
      }

      return resetUserInfo(address);
    },
    [provider, userInfo]
  );

  const getRankHireInfo = useCallback(
    async (address: string, ranks: [number]): Promise<any> => {
      if (!provider) {
        console.error("Provider is not available");
        return [];
      }

      setLoadingDashboard(true);

      try {
        const data = await getHireRankInfo(provider, address, ranks);
        return data;
      } catch (error) {
        console.error("Error fetching user info:", error);
        return [];
      } finally {
        setLoadingDashboard(false);
      }
    },
    [provider, userInfo]
  );

  const resetUserInfo = useCallback(
    async (address: string): Promise<UserInfo | null> => {
      setUserInfo(null);
      if (!provider) {
        console.error("Provider is not available");
        return null;
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
    [provider]
  );

  return (
    <DashboardContext.Provider
      value={{
        walletAddress: address,
        claimInfo,
        loadingDashboard,
        loadingClaimInfo,
        userInfo,
        fetchUserInfo,
        resetUserInfo,
        disconnectUserInfo,
        fetchClaimInfo,
        resetClaimInfo
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
