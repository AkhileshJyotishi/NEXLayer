const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const Staking=await deploy("Staking",{
        from:deployer,
        args:["0x4d2A311a9F1e5dD098489395d3FBd5b609d4f093"],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Staking.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","Staking"]