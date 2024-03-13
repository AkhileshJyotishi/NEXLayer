const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const Restaking1=await deploy("Restaking1",{
        from:deployer,
        args:["0x5b052A4ef37e5Bb53cfC689C2767f4a8Fc375084","0x7e5d8f52054170b2f556d633cd76a207177Ec7fb"],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Restaking1.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","Restaking1"]