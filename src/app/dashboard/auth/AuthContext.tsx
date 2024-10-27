import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers } from './mockData';  // import mock data

// Define types for User and AuthContext
type User = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  bio: string;
  current_level_id: string;
  wallet_address: string;
  type: string;
  updated_at: string;
  pfp: string;
  division_id: string;
};

type AuthContextType = {
  user: User | null;
  getUserByWallet: (walletAddress: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserByWallet = (walletAddress: string) => {
    const foundUser = mockUsers.find(u => u.wallet_address === walletAddress);
    setUser(foundUser || null);
  };

  return (
    <AuthContext.Provider value={{ user, getUserByWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
