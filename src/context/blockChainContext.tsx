import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react";
import { getPoolInfo, getPoolList, PoolInfo } from "@/services/walletService";

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
  const [poolInfoMap, setPoolInfoMap] = useState<Map<string, PoolInfo>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPoolInfoById = useCallback(
    async (id: string): Promise<PoolInfo | undefined> => {
      const cachedPoolInfo = poolInfoMap.get(id);
      if (cachedPoolInfo) {
        return cachedPoolInfo;
      }

      setLoading(true);
      try {
        const data = await getPoolInfo(id); // TODO: provider?
        setPoolInfoMap(prevMap => new Map(prevMap).set(id, data));
        return data;
      } catch (error) {
        console.error("Error fetching pool info:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [poolInfoMap]
  );

  const fetchAllPoolInfo = useCallback(async (): Promise<PoolInfo[]> => {
    const allPoolInfo: PoolInfo[] = [];
    setLoading(true);
    try {
      const data = await getPoolList(); // TODO: provider?
      data.forEach(pool => {
        setPoolInfoMap(prevMap =>
          new Map(prevMap).set(pool.id.toString(), pool)
        );
        allPoolInfo.push(pool);
      });
      return allPoolInfo;
    } catch (error) {
      console.error("Error fetching all pool info:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

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
