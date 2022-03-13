
const { ethers } = require("ethers");
const compound = require("@studydefi/money-legos/compound");
const { Contract, Provider } = require('ethers-multicall');

const bscNode = "https://winter-floral-sound.bsc.quiknode.pro/cfcded998f9d183303c10e2c132e03a55df752c1/"


const provider = new ethers.providers.JsonRpcProvider(bscNode);

const abi = [
    "function balanceOf(address owner) external view returns (uint256 balance)",
    "function decimals() public view virtual override returns (uint8)"
  ];

const testAddresses = [
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95",
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  "0x55d398326f99059fF775485246999027B3197955"

];

let testAddress = "0x85d30747868a5081f53BC7B9450301e761620a4f";
const balanceContract = new Contract("0x6d5dEAd694E9Db55f574C2D44f2A22557241b3D0", ["function getBNBBalance(address _address) external view returns(uint)"])

export const getBalances = async (_address ,addresses) => {
  try{
    const startDate = new Date();
 
    const ethcallProvider = new Provider(provider);
    await ethcallProvider.init();
  
    let contracts = []
  
    addresses.forEach(address => {
      const tokenContract = new Contract(address, abi);
      contracts.push(tokenContract);
    });
  
    const contractCallsList = []
  
    contractCallsList.push(balanceContract.getBNBBalance(_address));
  
    contracts.forEach(contract => { 
      let call = contract.balanceOf(_address);
      let decimalCall = contract.decimals();
      contractCallsList.push(call)
      contractCallsList.push(decimalCall)
    });
  
    const results = await ethcallProvider.all(contractCallsList);
    const balances = []
    balances.push(ethers.utils.formatEther(results[0]))
    for (let i = 1; i < results.length - 1; i+=2){
    let balance = ethers.utils.formatUnits(results[i], results[i+1])    
    balances.push(balance)
    }
  
    const endDate = new Date();
    const milliseconds = (endDate.getTime() - startDate.getTime());
    console.log("Time for function Call", milliseconds)
    return balances
  } catch(err) {
    console.log(err)
  }
  };
  
  getBalances(testAddress, testAddresses)