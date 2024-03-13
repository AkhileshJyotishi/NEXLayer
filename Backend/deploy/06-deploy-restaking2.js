const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const Restaking2=await deploy("Restaking2",{
        from:deployer,
        args:["0x5b052A4ef37e5Bb53cfC689C2767f4a8Fc375084","0xC209a4eF17eddf051349Db97e064BC0594e62330"],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Restaking2.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","Restaking2"]