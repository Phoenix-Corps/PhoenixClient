import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectButtonCustom = () => (
  <ConnectButton.Custom>
    {({ account, chain, openConnectModal, mounted }) => {
      return (
        <div className="connect-button">
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="buy-button flex justify-center items-center"
                >
                  Connect Wallet
                </button>
              );
            }
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);

export default ConnectButtonCustom;
