import React from 'react';
import Image from 'next/image';

interface TokenInfoProps {
  name: string;
  symbol: string;
  logo: string;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ name, symbol, logo }) => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Image src={logo} alt={`${name} logo`} width={40} height={40} className="rounded-full" />
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-400">{symbol}</p>
      </div>
    </div>
  );
};

export default TokenInfo;