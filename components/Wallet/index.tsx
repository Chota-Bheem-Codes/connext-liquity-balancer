import React, { useCallback, useEffect } from "react";
import useMetamask from "../../hooks/useMetamask";
import { shortenAddress } from "../../utils";

type Props = {
    isMetamaskConnected: boolean;
    connectMetamask: () => void;
    disconnectMetamask: () => void;
    metamaskAddress: string;
};

const Wallet = ({isMetamaskConnected, metamaskAddress,connectMetamask, disconnectMetamask}:Props) => {
  const handleMetamaskConnect = useCallback(async () => {
    if (!isMetamaskConnected) {
      await connectMetamask();
    } else {
      await disconnectMetamask();
    }
  }, [connectMetamask, disconnectMetamask, isMetamaskConnected]);

  return (
    <>
      <div>
        <button
          type="button"
          className="absolute top-[20px] right-[20px] inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-3"
          onClick={handleMetamaskConnect}
        >
          {isMetamaskConnected ? (
            <div className="text-left">
              <div>{shortenAddress(metamaskAddress)}</div>
            </div>
          ) : (
            "Connect Metamask"
          )}
        </button>
      </div>
    </>
  );
};

export default Wallet;
