interface Amount {
  icon: any;
  value: string;
}

export const data: {
  project: string;
  amounts: Amount[];
  status: string;
  statusColor: string;
}[] = [
  {
    project: "Simple Connect",
    amounts: [
      { icon: ["ETH", "USDT"], value: "0.9 ETH" },
      { icon: ["USDT", "BNB"], value: "1728 USDT ETH" },
      { icon: "BNB", value: "6,73836 BNB" },
      { icon: ["USDT", "ETH"], value: "2378 USDT BSC" }
    ],
    status: "PENDING",
    statusColor: "red"
  },
  {
    project: "Long Project Name",
    amounts: [
      { icon: ["ETH", "USDT"], value: "0.9 ETH" },
      { icon: ["USDT", "BNB"], value: "1728 USDT ETH" },
      { icon: "BNB", value: "6,73836 BNB" },
      { icon: ["USDT", "ETH"], value: "2378 USDT BSC" }
    ],
    status: "CLAIMABLE",
    statusColor: "yellow"
  },
  {
    project: "Maven Surge",
    amounts: [
      { icon: ["ETH", "USDT"], value: "0.9 ETH" },
      { icon: ["USDT", "BNB"], value: "1728 USDT ETH" },
      { icon: "BNB", value: "6,73836 BNB" },
      { icon: ["USDT", "ETH"], value: "2378 USDT BSC" }
    ],
    status: "CLAIMED",
    statusColor: "green"
  }
];
