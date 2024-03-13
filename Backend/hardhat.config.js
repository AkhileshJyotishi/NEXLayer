require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY";
  const CONFLUXSCAN_API_KEY=process.env.CONFLUXSCAN_API_KEY
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 5,
    },
    eSpaceTestnet:{
      url: "https://evmtestnet.confluxrpc.com" || "",
      accounts:[PRIVATE_KEY],
      chainId:71,
      blockConfirmations:5
    }
    
  },
  solidity: {compilers:[{version:"0.8.24"}]},
  confluxscan: {
    apiKey: CONFLUXSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  }
  ,
  namedAccounts: {
    deployer: {
      default: 0, 
      1: 0, 
    },
    user:{
      default:1,
    }
  },
};