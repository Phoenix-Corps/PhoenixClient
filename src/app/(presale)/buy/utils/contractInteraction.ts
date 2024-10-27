import { ethers } from 'ethers';
import { launchpadABI } from '../abis/launchpadABI'; 
import { LaunchpadAddress } from '../constants/contractAddresses';


export async function isValidAccessCode(code: string): Promise<boolean> {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  const launchpad = new ethers.Contract(LaunchpadAddress, launchpadABI, provider);
  
  try {
    const referralUser = await launchpad.referralUser(code);
    return referralUser !== ethers.ZeroAddress
  } catch (error) {
    console.error('Error checking access code:', error);
    return false;
  }
}