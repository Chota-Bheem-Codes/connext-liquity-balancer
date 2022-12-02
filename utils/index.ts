import { ethers } from "ethers";

export function shortenAddress(address: string, chars = 8): string {
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}

export function shortenTxn(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}

export const restFetcher = async (url: string) =>
  await (await fetch(url)).json();

export const expandDecimals = (amount: any = 0, decimals = "18") => {
  return ethers.utils.parseUnits(String(amount), decimals);
};

export const formatDecimals = (amount: any = 0, decimals = "18") => {
  if (parseFloat(amount) == 0) return "0";
  return ethers.utils.formatUnits(String(amount), decimals);
};
