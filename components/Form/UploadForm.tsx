import React, { useCallback, useState, CSSProperties, useEffect } from "react";
import { usePapaParse, useCSVDownloader } from "react-papaparse";
import { useCSVReader } from "react-papaparse";
import { assetList, disperseAddress } from "../../config/constants";
import useMetamask from "../../hooks/useMetamask";
import SelectForm from "../SelectForm";
import { ethers } from "ethers";
import erc20abi from "../../contracts/ERC20abi.json";
import disperseAbi from "../../contracts/ERC20abi.json";
import Wallet from "../Wallet";

type Props = {};

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: "80px",
  } as CSSProperties,
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "90px",
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: "red",
  } as CSSProperties,
};

export const setApproval = async (args: {
  erc20Address: string;
  signer: ethers.Signer | ethers.providers.Provider | undefined;
  recipient: any;
}) => {
  try {
    console.log("Aprroval args - ", args);
    const erc20Instance = new ethers.Contract(
      args.erc20Address,
      erc20abi.abi,
      args.signer
    );
    //console.log(args, `Approving ${args.recipient} to spend ${args.amount} tokens `);
    const tx = await erc20Instance.approve(
      args.recipient,
      ethers.constants.MaxInt256
    );
    //console.log("checking transaction hash ", tx);
    return tx;
    // let result = await args.provider.waitForTransaction(tx.hash);
    // //console.log("Checking setApproval result:",  result)
    // if (result?.status == 1) {
    //   return true;
    // }
    // return false;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getApproval = async (args: { tokenAddress: any; provider: any; userAddress: any; spenderAddress: any; tokenDecimals?: any; }) => {
  try {
    const erc20Instance = new ethers.Contract(
      args.tokenAddress,
      erc20abi.abi,
      args.provider
    );
    const result = await erc20Instance.allowance(
      args.userAddress,
      args.spenderAddress
    );
    // result looks like this : { _hex: '0x021beec43da88aa00000', _isBigNumber: true }

    // this return value needs to be compared with the user amount
    // console.log("get approval args - ",args)
    // console.log("approval value - ",ethers.utils.formatUnits(result.toString(), args.tokenDecimals))

    return ethers.utils.formatUnits(result.toString(), args.tokenDecimals);
  } catch (error) {
    console.log("Error", error);
  }
};

export const getColumns = (data: string[][]) => {
  const [chainIds, addresses, values]:any = [[], [], []]
  data.forEach((row: string[],index: number) => {
    if (index !== 0) {
      chainIds.push(row[0])
      addresses.push(row[1])
      values.push(row[2])
    }
  })
  return [chainIds, addresses, values]
}

const dispersingTokensEvm = async (
  disperseAddress: string,
  provider: any,
  data: string[][],
) => {
  const [chainIds, addresses, values] = getColumns(data)
  console.log("JJ => ",chainIds, addresses, values)
  const disperseInstance = new ethers.Contract(
      disperseAddress,
      disperseAbi.abi,
      provider
  );
  try {
    const tx = await disperseInstance.disperse()
    let result = await provider.waitForTransaction(tx.hash)
    if (result?.status == 1) {
      return true;
    }
    return false;
  }catch(e){
    console.log("Disperse Error =>",e)
  }
};

const UploadForm = (props: Props) => {
  const [chainId, setChainId] = useState(Object.keys(assetList)[0]);
  const [token, setToken] = useState(assetList[chainId][0].name);
  const [instructionData, setInstructionData] = useState<any>([]);
  const [showError, setShowError] = useState(false);
  const { jsonToCSV } = usePapaParse();
  const { CSVDownloader, Type } = useCSVDownloader();
  const { CSVReader } = useCSVReader();
  const {
    isMetamaskConnected,
    metamaskChainId,
    metamaskAddress,
    connectMetamask,
    disconnectMetamask,
  } = useMetamask();

  // const changeHandler = useCallback((event:any)=>{
  //   // Passing file data (event.target.files[0]) to parse using Papa.parse
  //   console.log("Constructing JSON from CSV")
  //   setInstructionJson({})
  //   Papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (results) {
  //       if (results.errors.length > 0) {
  //         //Handle Error
  //       }
  //       console.log(results.data)
  //       setInstructionJson(results.data)
  //     },
  //   });
  // },[setInstructionJson])

  const handleDisperse = useCallback(async () => {
    
    console.log("Initiaiting Disperse");
    console.log("TESTT in PAGe", isMetamaskConnected, metamaskChainId, metamaskAddress);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const approvalAmount = await getApproval({
      tokenAddress: assetList[chainId].filter(asset=>asset.name == token)[0].address,
      provider: window.ethereum,
      userAddress: metamaskAddress,
      spenderAddress: disperseAddress[chainId],
    });
    if (parseFloat(String(approvalAmount)) == 0) {
      await setApproval({
        erc20Address: assetList[chainId].filter(asset=>asset.name == token)[0].address,
        signer: provider,
        recipient:  disperseAddress[chainId],
      });
    }
    await dispersingTokensEvm(disperseAddress[chainId],provider,instructionData)
  }, [metamaskAddress]);

  useEffect(() => {
    setToken(assetList[chainId][0].name)
  },[chainId])

  return (
    <>
      <div className="grid place-items-center">
        <div className="absolute top-[20px] right-[20px]">
          <Wallet
            isMetamaskConnected={isMetamaskConnected}
            connectMetamask={connectMetamask}
            disconnectMetamask={disconnectMetamask}
            metamaskAddress={metamaskAddress}
          />
        </div>
        <SelectForm
          label={"Select Asset"}
          value={token}
          setValue={setToken}
          list={assetList[chainId].map((asset) => asset.name)}
        />
        <SelectForm
          label={"Select Source Chain"}
          value={chainId}
          setValue={setChainId}
          list={Object.keys(assetList)}
        />
        <CSVReader
          onUploadAccepted={(results: any) => {
            if (results.errors.length > 0) {
            }
            console.log("---------------------------");
            console.log(results.data);
            setInstructionData(results.data);
            console.log("---------------------------");
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
          }: any) => (
            <>
              <div style={styles.csvReader}>
                <button
                  type="button"
                  {...getRootProps()}
                  style={styles.browseFile}
                  className="bg-gray-400 hover:bg-gray-300 text-white rounded"
                >
                  Browse
                </button>
                <div style={styles.acceptedFile}>
                  {acceptedFile && acceptedFile.name}
                </div>
                <button
                  {...getRemoveFileProps()}
                  style={styles.remove}
                  className="bg-gray-400 hover:bg-gray-300 text-white rounded"
                >
                  Remove
                </button>
              </div>
              <ProgressBar style={styles.progressBarBackgroundColor} />
            </>
          )}
        </CSVReader>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
          onClick={handleDisperse}
        >
          Disperse
        </button>
       
        {/* <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      config={{
        delimiter: ';',
      }}
      data={[
        {
          'Column 1': '1-1',
          'Column 2': '1-2',
          'Column 3': '1-3',
          'Column 4': '1-4',
        },
        {
          'Column 1': '2-1',
          'Column 2': '2-2',
          'Column 3': '2-3',
          'Column 4': '2-4',
        },
        {
          'Column 1': '3-1',
          'Column 2': '3-2',
          'Column 3': '3-3',
          'Column 4': '3-4',
        },
        {
          'Column 1': 4,
          'Column 2': 5,
          'Column 3': 6,
          'Column 4': 7,
        },
      ]}
    >
      Download
    </CSVDownloader> */}
      </div>
    </>
  );
};

export default UploadForm;
