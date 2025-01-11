import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { base, bsc } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Phoenix",
  projectId: "9ddcb68482bc223eb1614b0a7d353e57",
  chains: [bsc, base],
  ssr: true
});
