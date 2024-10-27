import { ethers } from "ethers";
import { launchpadABI } from "../abis/launchpadABI";
import { LaunchpadAddress } from "../constants/contractAddresses";

const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
export const LaunchpadContract = new ethers.Contract(
    LaunchpadAddress,
    launchpadABI,
    provider
  );