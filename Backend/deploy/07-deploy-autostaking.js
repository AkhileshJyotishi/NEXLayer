const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const Autostaking=await deploy("Autostaking",{
        from:deployer,
        args:["0x5b052A4ef37e5Bb53cfC689C2767f4a8Fc375084","0x7e5d8f52054170b2f556d633cd76a207177Ec7fb","0xEa7f8c0c39d5F9A5AcA465C6B083710De1917196","0x9f5da4e576346Ab03C2dcD451501092e3c78E58C"],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Autostaking.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","Autostaking"]