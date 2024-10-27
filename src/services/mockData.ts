import Vercel from "@public/images/Next.png";

export type UserData = {
  walletAddress: string;
  level: number;
  experience: number;
};

export type PresaleData = {
  name: string;
  logo: string;
  roundEnding?: string;
  round?: number;
  roundPrice?: number;
  totalRaised?: string;
  status: "Active" | "Upcoming" | "Ended";
  presaleLink: string;
};

// Mock data for users
export const mockData: UserData[] = [
  {
    walletAddress: "0xF977814e90dA44bFA03b6295A0616a897441aceC",
    level: 10,
    experience: 3000
  },
  {
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    level: 22,
    experience: 9000
  },
  {
    walletAddress: "0x281055afc982d96Fab65b3a49cac8B878184Cb16",
    level: 5,
    experience: 1200
  },
  {
    walletAddress: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
    level: 18,
    experience: 7600
  },
  {
    walletAddress: "0x66f820a414680B5bcda5eECA5dea238543F42054",
    level: 7,
    experience: 1900
  }
];

export const mockPresales: PresaleData[] = [
  {
    name: "TBA",
    logo: Vercel.src,
    status: "Upcoming",
    presaleLink: "#"
  },
  {
    name: "TBA",
    logo: Vercel.src,
    status: "Upcoming",
    presaleLink: "#"
  },
  {
    name: "TBA",
    logo: Vercel.src,
    status: "Upcoming",
    presaleLink: "#"
  },
  {
    name: "Test",
    logo: Vercel.src,
    status: "Active",
    presaleLink: "/buy?presaleId=1&code=stanko",
    round: 1,
    roundEnding: "2 days",
    roundPrice: 0.01
  }
];
