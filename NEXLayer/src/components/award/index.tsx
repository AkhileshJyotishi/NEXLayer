"use client";
import React, { useState } from 'react';
import Statistics from "@/components/statistics";
import Button from '@/components/ui/button';
import { AiFillThunderbolt } from "react-icons/ai";
import { Input } from '../ui/input';
import HoverPopover from '../ui/hover-card';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { Table1Presentation } from '../data-table';

const Award = () => {
  const token = "aave";
  const staked = "aave2";
  const award = "1";
  const [stake, setStake] = useState<number>(0);
  const [stakeError] = useState<string>('');

  const period = "1"; // Assuming period is a constant

  return (
    <div className='h-full flex flex-col'>
      <Statistics />
      <div className="w-full md:w-11/12  grid grid-cols-1 sm:grid-cols-2 p-2 justify-center gap-4 items-stretch sm:mt-auto sm:grow max-w-[100%] mx-auto">
        <AwardDetails token={token} staked={staked} award={award} stake={stake} setStake={setStake} stakeError={stakeError} period={period} />

        <AwardDetails token={token} staked={staked} award={award} stake={stake} setStake={setStake} stakeError={stakeError} period={period} />
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
}

const AwardDetails: React.FC<AwardDetailsProps> = ({ token, staked, award, stake, setStake, stakeError, period }) => {
  return (
    <div className="flex  items-center p-4 border-[0.1px] border-gray-500 flex-col gap-2 h-fit sm:h-full">

      <div className="text-2xl font-bold">Staked {token}</div>
      <div className="text-2xl font-bold">{staked}</div>
      <div className="text-4xl font-bold">${award}</div>
      <div className="flex lg:flex-row flex-col items-center gap-2 p-2">
        <Input onChange={(e) => { if (+e >= 0) setStake(+e) }} className='bg-black rounded-md w-full h-14' value={stake} id={"stake"} errorMessage={stakeError} min={0} placeholder='Enter' />
        <Button variant="shimmer" className='py-2 !h-full'>
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
