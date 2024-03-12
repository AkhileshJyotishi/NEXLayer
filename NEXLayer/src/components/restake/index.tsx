"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiTransfer } from 'react-icons/bi';
import { Input } from '../ui/input';
import Button from '../ui/button';
import xCFX from '@/assets/xcfx-high-resolution-logo-transparent.svg';
import { cn } from "@/utils/cn";
import ConfirmationDialog from '../alert';
import { ethers } from 'ethers';
declare var window: any

const Stake: React.FC = () => {
  const [stake, setStake] = useState<number>(10);
  const [award, setAward] = useState<number>(0);
  const [exchange, setExchange] = useState<string>("100%");
  const [stakeError, setStakeError] = useState("");
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined)
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    console.log("Account deactivated");
    setOpen(false);
  }
  const handleStakeCFX = () => {
    setOpen(true);
  }
  const SetProvider = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider)
  }

  useEffect(() => {
    SetProvider()

  }, [])
  const Project = async () => {
    const accounts = await provider?.send("eth_requestAccounts", []);
    console.log(accounts[0])
    const balance=await provider?.getBalance(accounts[0]);
    
    return balance;
  }
  useEffect(() => {
    Project().then((balance)=>{
      
    }).catch((err)=>{
      console.log(err)
    }
    ) 
  }, [provider])
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
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        onCancel={handleClose}
        onConfirm={handleConfirm}
        title="Auto Restake"
        message="Are you sure you want to opt for Auto Restake? This action cannot be undone."
        buttonText="Auto Stake"
      />
      <div className='flex flex-col gap-12 sm:h-full w-3/5 mx-auto'>
        <div className='flex w-4/5 mx-auto justify-between mt-16'>
          <Conflux text='Conflux' className='h-16 w-16' textClass='mx-auto' picture='https://s2.coinmarketcap.com/static/img/coins/64x64/7334.png' />
          <BiTransfer className='h-16 w-16 rounded-full my-auto' />
          <Conflux text='xConflux' className='h-16 w-16' textClass='mx-auto' picture={xCFX} />
        </div>
        <div className='w-4/5 mx-auto p-2 flex gap-2 items-center flex-wrap sm:flex-nowrap gap-y-2'>
          <Conflux
            text='Conflux'
            className='h-8 w-8 shrink-0'
            Base_Class='flex items-center gap-2'
            textClass='text-white mt-0'
            picture={"https://s2.coinmarketcap.com/static/img/coins/64x64/7334.png"} />

          <div className='w-full'>
            <Input onChange={(e) => { if (+e >= 0) setStake(+e) }} className='bg-black rounded-md w-full h-14' value={stake} id={"stake"} errorMessage={stakeError} min={0} placeholder='Enter' />
          </div>
        </div>
        <div className='w-full sm:w-4/5 sm:mx-auto flex sm:justify-around justify-between'>
          <Button className='text-2xl' variant='shimmer' onClick={handleStakeCFX}>Stake</Button>
          <Button className='text-2xl' variant='shimmer'>Auto Restake</Button>
        </div>
        <div className='flex flex-col w-4/5 mx-auto gap-4 sm:my-auto'>
          <StakeInfo title="you will recieve" value={`${stake} xConflux`} />
          <StakeInfo title="Exchange rate" value={exchange} />
          {/* <StakeInfo title="estimated gas fee" value={award} /> */}
          <StakeInfo title="Staked Amount" value={award} />
        </div>

      </div>
    </>
  );
}

interface StakeInfoProps {
  title: string;
  value: React.ReactNode;
}

const StakeInfo: React.FC<StakeInfoProps> = ({ title, value }) => {
  return (
    <div className='flex justify-between'>
      <div className='capitalize  tracking-wide font-bold'>{title}</div>
      <div className='capitalize font-bold'>{value}</div>
    </div>
  );
}
const Conflux = ({ text, className, Base_Class, textClass, picture }: { text: string, className: string, Base_Class?: string, textClass?: string, picture: string }) => (
  <div className={Base_Class}>
    <div className='bg-white w-fit rounded-full p-2 shrink-0 mx-auto'>
      <Image alt='' src={picture} height={400} width={400} className={cn(' rounded-full', className)} />
    </div>
    <div className={cn('mt-4 text-center  font-bold text-xl w-[100px] sm:w-[150px]', textClass)}>{text}</div>

  </div>
)


export default Stake;

