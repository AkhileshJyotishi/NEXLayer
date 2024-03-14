"use client";
import React, { useState } from 'react';
import Statistics from "@/components/statistics";
import Button from '@/components/ui/button';
import { AiFillThunderbolt } from "react-icons/ai";
import { Input } from '../ui/input';
import HoverPopover from '../ui/hover-card';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Table1Presentation } from '../data-table';
import stakeData from '@/data/stake.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import TextInput from '../ui/input/text-input';

declare var window: any

const Award = () => {
  const token = "aave";
  const staked = "aave2";
  const award = "1";
  const [stake, setStake] = useState<number>(0);
  const [stakeError] = useState<string>('');

  const period = "1"; // Assuming period is a constant
const handleUnstakeCFX = async () => {
  // handle unstake CFX
  try {
    if(window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);

        // const amountWei = ethers.utils.parseEther(stake.toString());
        
        const transaction = await contract.unstake(stake);  
        // burn xcfx ---- pending

        await listenForTransactionMined(transaction, provider);
        console.log("Unstaked successfully !!!");

    }else{
        console.log("Please Connect Wallet !!!")
    }
} catch (error) {
    toast.warning("Please enter the amount to unstake2");
    
}
}

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

const handleUnstakeXCFX = () => {
  // handle unstake XCFX
}

  return (
    <div className='h-full flex flex-col'>
      <Statistics />
      <div className="w-full md:w-11/12  grid grid-cols-1 sm:grid-cols-2 p-2 justify-center gap-4 items-stretch sm:mt-auto sm:grow max-w-[100%] mx-auto">
        <AwardDetails token={token} staked={staked} award={award} stake={stake} setStake={setStake} stakeError={stakeError} period={period} callback={handleUnstakeCFX}/>

        <AwardDetails token={token} staked={staked} award={award} stake={stake} setStake={setStake} stakeError={stakeError} period={period} callback={handleUnstakeXCFX} />
      </div>
    </div>
  );
}

interface AwardDetailsProps {
  token: string;
  staked: string;
  award: string;
  stake: number;
  setStake: React.Dispatch<React.SetStateAction<number>>;
  stakeError: string;
  period: string;
  callback: () => void;
}

const AwardDetails: React.FC<AwardDetailsProps> = ({ token, staked, award, stake, setStake, stakeError, period,callback }) => {
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

  return (
    <div className="flex  items-center p-4 border-[0.1px] border-gray-500 flex-col gap-2 h-fit sm:h-full">

      <div className="text-2xl font-bold">Staked {token}</div>
      <div className="text-2xl font-bold">{staked}</div>
      <div className="text-4xl font-bold">${award}</div>
      <div className="flex lg:flex-row flex-col items-center gap-2 p-2">
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
     
        <Button variant="shimmer" className='py-2 !h-full' onClick={callback} >
          <AiFillThunderbolt className='text-lg' />
          <div className='font-bold'>Unstake</div>
        </Button>
      </div>
      <div className='flex gap-2 items-center w-full'>
        <HoverPopover content={<div>Content</div>}>
          <div className='flex justify-around gap-4 w-full'>
            <div className='flex gap-2 items-center cursor-help'>
              <IoMdInformationCircleOutline className='text-lg' />
              Cooldown Period
            </div>
            <div>{period}</div>
          </div>
        </HoverPopover>
      </div>
      <Table1Presentation/>

    </div>
  );
}

export default Award;
