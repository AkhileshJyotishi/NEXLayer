"use client";
import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Button from '../ui/button';
import yCFX from '@/assets/yConflux.png';
import { cn } from "@/utils/cn";
import ConfirmationDialog from '../alert';
import { ethers } from 'ethers';
import stakeData from '@/data/stake.json';
import restakeData from '@/data/restake.json';
import TextInput from '../ui/input/text-input';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { SiBlockchaindotcom } from "react-icons/si";
import { GiCash } from "react-icons/gi";
import { RiExchangeLine } from "react-icons/ri";
declare var window: any

const Stake: React.FC = () => {
  // css effect code
  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }







  const [stake, setStake] = useState<number>(10);
  const [award, setAward] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);  
  const [availableBalance, setAvailableBalance] = useState<number>(9.3);
  const [exchange, setExchange] = useState<string>("100%");
  const [conversionRate]=useState<number>(0.93);
  const [stakeError, setStakeError] = useState("");
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined)
  const handleClose = () => setOpen(false);
  const handleConfirm = async () => {
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData.addressRestake, restakeData.abiRestake, signer);


        const amountWei = ethers.utils.parseEther(stake.toString());

            let txn = await contractRestake.transferTokens(amountWei)
            // let txn = await contractRestake.methods.transferTokens(amountWei).call();


            await listenForTransactionMined(txn, provider);
            console.log("Staked successfully !!!");

      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    }finally{
      setOpen(false);

    }
  }
  const handleReStakeCFX = async() => {
    setOpen(true);
  
  }
  const SetProvider = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } catch (error) {
        console.error('Error requesting accounts:', error);
      }
    } else {
      console.error('window.ethereum is not available');
    }
  }

  useEffect(() => {
    SetProvider()

  }, [])


  function listenForTransactionMined(transactionResponse: any, provider: any) {
    try {
      //listen for this transaction to be finished
      return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReciept: any) => {
          console.log(`Completed with ${transactionReciept.confirmations}`);
          resolve(transactionReciept);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        onCancel={handleClose}
        onConfirm={handleConfirm}
        title="Stake Conflux"
        message="Are you sure you want to stake your Conflux? You can recieve your tokens 7 days after unstaking the amount."
        buttonText="Stake"
      />
     
      <div className='flex flex-col gap-12 w-full sm:h-full sm:w-4/5 mx-auto p-4  rounded-md mt-4 border border-purple-600'>

        <div className='flex flex-col gap-6 w-full sm:w-3/5 sm:mx-auto justify-between mt-16'>
        <div className='w-full  bg-gradient-to-r from-indigo-500 to-purple-500  flex flex-col gap-4 p-4 rounded-md'>
            <Conflux
              text='xConflux'
              className='h-12 w-12 shrink-0'
              Base_Class='flex items-center gap-2'
              textClass='text-white mt-0 text-[28px]'
              picture={yCFX} />
            <motion.div
              style={{
                background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
              className="p-[2px] rounded-lg transition duration-300 group/input w-full"
            >
              <TextInput
                onChange={(e) => { if (+e.target.value > 0) setStake(e.target.value as any) }}
                type="number"
                className={"bg-black rounded-md w-full h-14"}
                value={stake}
                name="number"
                id={"1"}
                min={0}
                errorMessage={stakeError}
              />
            </motion.div>
            <div className='p-2 font-semibold flex justify-between '>
              <div className='flex gap-4 items-center'>
            <SiBlockchaindotcom />
              Available Balance 
              </div>
              <div>
                {availableBalance}
              </div>
            </div>
            <div className='p-2 font-semibold flex justify-between '>
              <div className='flex gap-4 items-center'>
              <GiCash className='text-xl'/>
              Estimated Gas Price
              </div>
              <div>
                {balance}
              </div>
            </div>
          
          </div>
          <div className='w-full  bg-gradient-to-r from-indigo-500 to-purple-500  flex flex-col gap-4 p-2 rounded-md'>
            <Conflux
              text='lxConflux'
              className='h-12 w-12 shrink-0'
              Base_Class='flex items-center gap-2'
              textClass='text-white mt-0 text-[28px]'
              picture={yCFX} />
            <motion.div
              style={{
                background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
              className="p-[2px] rounded-lg transition duration-300 group/input w-full"
            >
              <TextInput
                onChange={(e) => { if (+e.target.value > 0) setStake(e.target.value as any) }}
                type="number"
                className={"bg-black rounded-md w-full h-14"}
                value={stake}
                name="number"
                id={"1"}
                min={0}
                errorMessage={stakeError}
              />
            </motion.div>
            <div className='p-2 font-semibold flex justify-between '>
              <div className='flex gap-4 items-center'>
              <RiExchangeLine className='text-xl'/>
              Conversion Rate
              </div>
              <div>
                {conversionRate}
              </div>
            </div>
          </div>
         
         
        </div>
        
        <div className='w-3/5 mx-auto flex sm:justify-around flex-col sm:flex-row gap-y-6'>
          <Button className='text-2xl' variant='shimmer' onClick={handleReStakeCFX}>ReStake</Button>
        </div>
        

      </div>
    </>
  );
}


const Conflux = ({ text, className, Base_Class, textClass, picture }: { text: string, className: string, Base_Class?: string, textClass?: string, picture: string|StaticImageData }) => (
  <div className={Base_Class}>
    <div className='bg-white w-fit rounded-full p-2 shrink-0 '>
      <Image alt='' src={picture} height={400} width={400} className={cn(' rounded-full', className)} />
    </div>
    <div className={cn('mt-4 text-center  font-bold text-xl w-[120px] sm:w-[0px]', textClass)}>{text}</div>

  </div>
)


export default Stake;

