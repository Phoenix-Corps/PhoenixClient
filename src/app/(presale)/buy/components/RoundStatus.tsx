import React from 'react';
import Countdown from './Countdown';

interface RoundStatusProps {
  roundInfo: {
    roundStart: number;
    roundEnd: number;
  };
}

const RoundStatus: React.FC<RoundStatusProps> = ({ roundInfo }) => {
  const now = Math.floor(Date.now() / 1000);

  if (now < roundInfo.roundStart) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-400 mb-4">Round Starts In:</h2>
        <Countdown endTime={roundInfo.roundStart} />
      </div>
    );
  } else if (now >= roundInfo.roundStart && now < roundInfo.roundEnd) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-400 mb-4">Round Ends In:</h2>
        <Countdown endTime={roundInfo.roundEnd} />
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-white">This round has finished.</p>
      </div>
    );
  }
};

export default RoundStatus;