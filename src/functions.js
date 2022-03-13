import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/39feadaa0c5f439aabcd8f6312ed12e5");

export const abi = [
    "function balanceOf(address owner) external view returns (uint256 balance)",
  ];

export const address = "";

export const functionCall = async () => {
    try {
      let contract = new ethers.Contract(address, abi, provider);
      return await contract.balanceOf();
    } catch (e) {
      console.log(e);
    }
  };