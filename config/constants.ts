export enum ChainFLow {
  EVM,
  RouterChain,
}

type TokenType = {
  name: string;
  symbol: string;
  logoURI: string;
  address: string;
  isNative: boolean;
  flow: ChainFLow;
};

export const disperseAddress: { [key: string]: string } = {
  "7545": "0xeee",
  "8545": "0xeee",
};

export const assetList: { [key: string]: TokenType[] } = {
  "7545": [
    {
      name: "Test Token 1",
      symbol: "18",
      logoURI: "https://cryptologos.cc/logos/apecoin-ape-ape-logo.png?v=023",
      address: "0xeeee",
      isNative: false,
      flow: ChainFLow.EVM,
    },
  ],
  "8545": [
    {
      name: "Test Token 1",
      symbol: "18",
      logoURI: "https://cryptologos.cc/logos/symbol-xym-logo.png?v=023",
      address: "0xeeee",
      isNative: false,
      flow: ChainFLow.EVM,
    },
  ],
};
