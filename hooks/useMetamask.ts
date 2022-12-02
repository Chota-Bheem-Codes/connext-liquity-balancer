import { useCallback, useEffect, useState } from "react";

export default function useMetamask() {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [metamaskChainId, setMetamaskChainId] = useState("");
  const [metamaskAddress, setMetamaskAddress] = useState("");
  console.log(
    "in HOOK isMetamaskConnected metamaskChainId metamaskAddress",
    isMetamaskConnected,
    metamaskChainId,
    metamaskAddress
  );
  const connectMetamask = useCallback(async () => {
    console.log("--Connecting with Metamask---");
    const { ethereum } = window;
    if (!ethereum) return;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setMetamaskAddress(accounts[0]);
      setIsMetamaskConnected(true);
      setMetamaskChainId(parseInt(ethereum.chainId, 16).toString());
    } catch (e) {
      console.log(`Couldnt access metmask address - `, e);
    }
  }, [setIsMetamaskConnected, setMetamaskChainId, setMetamaskAddress]);

  const subscribeMetmaskEvents = useCallback(async () => {
    const { ethereum } = window;
    if (ethereum) {
      ethereum.on("accountsChanged", () => {
        //change current wallet address
        console.log("Metamask Account Changed");
        if (ethereum.selectedAddress) {
          setMetamaskAddress(ethereum.selectedAddress);
        } else {
          setIsMetamaskConnected(false);
          setMetamaskAddress("");
          setMetamaskChainId("");
        }
      });
      ethereum.on("chainChanged", () => {
        //chamge current wallet network
        console.log("Metamask Chain Changed");
        setTimeout(() => {
          setMetamaskChainId(parseInt(ethereum.chainId, 16).toString());
        }, 0);
      });
    }
  }, [setIsMetamaskConnected, setMetamaskChainId, setMetamaskAddress]);

  const removeAllListeners = useCallback(() => {
    const { ethereum } = window;
    ethereum.removeAllListeners();
  }, []);

  const activateEventListener = useCallback(
    async () => await subscribeMetmaskEvents(),
    [subscribeMetmaskEvents]
  );

  //Event Listeners
  useEffect(() => {
    if (!isMetamaskConnected) return;
    activateEventListener();
    return () => {
      removeAllListeners();
    };
  }, [isMetamaskConnected]);

  const disconnectMetamask = useCallback(async () => {
    setMetamaskAddress("");
    setIsMetamaskConnected(false);
    setMetamaskChainId("");
  }, [setIsMetamaskConnected, setMetamaskChainId, setMetamaskAddress]);

  useEffect(() => {}, []);

  return {
    connectMetamask,
    disconnectMetamask,
    isMetamaskConnected,
    metamaskChainId,
    metamaskAddress,
  };
}
