// context/BlockchainContext.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react";
import { getPoolInfo, getPoolList, PoolInfo } from "@/services/walletService";
import { useEthersProvider } from "@/services/useEthersProvider";

export interface BlockchainContextType {
  poolInfo: PoolInfo[];
  fetchPoolInfoById: (id: string) => Promise<PoolInfo | undefined>;
  fetchAllPoolInfo: () => Promise<PoolInfo[]>;
  loading: boolean;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(
  undefined
);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const provider = useEthersProvider();
  const [poolInfoMap, setPoolInfoMap] = useState<Map<string, PoolInfo>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPoolInfoById = useCallback(
    async (id: string): Promise<PoolInfo | undefined> => {
      if (!provider) {
        console.error("Provider is not available");
        return undefined;
      }

      const cachedPoolInfo = poolInfoMap.get(id);
      if (cachedPoolInfo) {
        console.log("CACHE HIT", cachedPoolInfo);
        return cachedPoolInfo;
      }

      setLoading(true);
      try {
        const data = await getPoolInfo(provider, parseInt(id));
        setPoolInfoMap(prevMap => new Map(prevMap).set(id, data));
        return data;
      } catch (error) {
        console.error("Error fetching pool info:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [poolInfoMap, provider]
  );

  const fetchAllPoolInfo = useCallback(async (): Promise<PoolInfo[]> => {
    if (!provider) {
      console.error("Provider is not available");
      return [];
    }

    // TODO: probably need better condition for cache checking
    if (poolInfoMap.size > 0) {
      console.log("CACHE HIT FOR ALL POOLS");
      return Array.from(poolInfoMap.values());
    }

    const allPoolInfo: PoolInfo[] = [];
    setLoading(true);
    try {
      const data = await getPoolList(provider);
      data.forEach(pool => {
        setPoolInfoMap(prevMap => new Map(prevMap).set(String(pool.id), pool));
        allPoolInfo.push(pool);
      });
      return allPoolInfo;
    } catch (error) {
      console.error("Error fetching all pool info:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [provider, poolInfoMap]);

  return (
    <BlockchainContext.Provider
      value={{
        poolInfo: Array.from(poolInfoMap.values()),
        fetchPoolInfoById,
        fetchAllPoolInfo,
        loading
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchainContext = (): BlockchainContextType => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error(
      "useBlockchainContext must be used within a BlockchainProvider"
    );
  }
  return context;
};
