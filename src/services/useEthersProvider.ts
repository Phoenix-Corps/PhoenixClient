import { providers } from "ethers";
import { useMemo } from "react";
import type { Chain, Client, Transport } from "viem";
import { Config, useAccount, useClient } from "wagmi";

function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: client.chain.id,
    name: client.chain.name,
    ensAddress: client.chain.contracts?.ensRegistry?.address
  };
  if (transport.type === "fallback")
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network)
      )
    );
  return new providers.JsonRpcBatchProvider(transport.url, network);
}

/** Hook to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({
  chainId
}: { chainId?: number | undefined } = {}) {
  const acc = useAccount();

  const clientChainId = useMemo(() => chainId || acc.chainId, [acc, chainId]);
  const client = useClient<Config>({ chainId: clientChainId });

  return useMemo(() => {
    if (client) return clientToProvider(client);
  }, [client]);
}
