"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar";
import { cn } from "@/utils/cn";
import data from "@/data/navbar.json";
import Button from "../ui/button";
import {ethers} from "ethers"
declare var window: any

interface MenuItem {
  title: string;
  links?: Link[];
  items?: Product[];
}

interface Link {
  title: string;
  href: string;
}

interface Product {
  title: string;
  href: string;
  src: string;
  description: string;
}


export function NavbarDemo() {


  return (
      <Navbar className="top-2" />
  );
}


function Navbar({ className }: { className?: string }) {
  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect Wallet button");
        }
      } catch (err:any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };


  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts:string) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await provider.send("eth_requestAccounts", []);

        setWalletAddress(accounts[0]);
      } catch (err:any) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-[64rem] mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        {data.menuItems.map((item, index) => (
          <MenuItem key={index} setActive={setActive} active={active} item={item.title} href={item.href} />

        ))}
        {
          walletAddress ? (<div className="text-white w-[130px] ">{walletAddress.substring(0,7)+"...."+walletAddress.substring(walletAddress.length-4,walletAddress.length-1)} </div> ):(
            <Button  className={"text-white"} onClick={()=>connectWallet()}>Connect</Button>
          )
        }
      </Menu>
    </div>
  );

}
