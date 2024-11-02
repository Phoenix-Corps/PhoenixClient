import { providers } from "ethers";
import { useMemo } from "react";
import type { Account, Chain, Client, Transport } from "viem";
import { Config, useConnectorClient } from "wagmi";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);

  return provider.getSigner(account.address);
}

/** Action to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  // const connectorClient = useConnectorClient();
  // if (connectorClient.failureCount > 0) {
  //   console.error("[CONNECTOR CLIENT FAILURE]", connectorClient);
  // }

  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
