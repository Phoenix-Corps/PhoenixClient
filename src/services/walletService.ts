import { mockData, mockPresales } from "./mockData";

/* 
import { getXP,getLevel } from "@/services/contractDataService";
  const testFunctions = async () => {
    const xpResponse = await getXP('0xF977814e90dA44bFA03b6295A0616a897441aceC');
    console.log(xpResponse); // { success: true, wallet: '0x123', result: 500 }
  
    const levelResponse = await getLevel('0x456');
    console.log(levelResponse); // { success: true, wallet: '0x456', result: 5 }
  
    const invalidResponse = await getXP('invalid_wallet');
    console.log(invalidResponse); // { success: false, message: 'Invalid wallet address' }
  };
*/

export const getXP = async (wallet: string) => {
  // Find the user in the mockData by walletAddress
  const user = Object.values(mockData).find(
    user => user.walletAddress === wallet
  );

  if (user) {
    return {
      success: true,
      wallet,
      result: user.experience
    };
  } else {
    return {
      success: false,
      message: "Wallet not found"
    };
  }
};

export const getLevel = async (wallet: string) => {
  // Find the user in the mockData by walletAddress
  const user = Object.values(mockData).find(
    user => user.walletAddress === wallet
  );

  if (user) {
    return {
      success: true,
      wallet,
      result: user.level
    };
  } else {
    return {
      success: false,
      message: "Wallet not found"
    };
  }
};

export const getActivePresales = async (wallet: string) => {
  const presales = mockPresales.filter(presale => presale.status === "Active");

  if (presales) {
    return {
      success: true,
      wallet,
      result: presales
    };
  } else {
    return {
      success: false,
      message: "Wallet not found"
    };
  }
};
