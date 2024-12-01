// context/BlockchainContext.tsx
import poolToProjectMapping from "@/config/poolToProjectMapping.json";
import { useEthersProvider } from "@/services/useEthersProvider";
import { getPoolInfo, getPoolList, PoolInfo } from "@/services/walletService";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react";

export interface BlockchainContextType {
  poolInfo: PoolInfo[];
  fetchPoolInfoById: (id: string) => Promise<PoolInfo | undefined>;
  fetchAllPoolInfo: () => Promise<PoolInfo[]>;
  getPoolInfoById: (id: string) => PoolInfo | undefined;
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
        if (data) {
          setPoolInfoMap(prevMap => new Map(prevMap).set(id, data));
        }
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

  const getPoolInfoById = useCallback((id: string) => {
    return poolInfoMap.get(id);
  }, [poolInfoMap])

  const fetchAllPoolInfo = useCallback(async (): Promise<PoolInfo[]> => {
    if (!provider) {
      console.error("Provider is not available");
      return [];
    }

    if (poolInfoMap.size === poolToProjectMapping.length) {
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
        getPoolInfoById,
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
